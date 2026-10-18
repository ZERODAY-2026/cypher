import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const csvPath = path.resolve(__dirname, '../data/owid_energy.csv');

async function inspectCsv() {
  console.log(`Inspecting CSV at: ${csvPath}`);

  if (!fs.existsSync(csvPath)) {
    console.error(`Error: CSV file not found at ${csvPath}`);
    process.exit(1);
  }

  const parser = fs.createReadStream(csvPath).pipe(
    parse({
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true,
      trim: true,
    })
  );

  let rowCount = 0;
  let headers = [];
  const uniqueCountries = new Set();
  let minYear = Infinity;
  let maxYear = -Infinity;
  const columnTypeSamples = {};

  for await (const record of parser) {
    if (rowCount === 0) {
      headers = Object.keys(record);
      for (const h of headers) {
        columnTypeSamples[h] = { nonNullCount: 0, isNumeric: true, isInteger: true };
      }
    }

    rowCount++;

    const country = record.country;
    if (country) {
      uniqueCountries.add(country);
    }

    const yearVal = parseInt(record.year, 10);
    if (!isNaN(yearVal)) {
      if (yearVal < minYear) minYear = yearVal;
      if (yearVal > maxYear) maxYear = yearVal;
    }

    for (const h of headers) {
      const val = record[h];
      if (val !== undefined && val !== null && val !== '') {
        const stats = columnTypeSamples[h];
        stats.nonNullCount++;
        if (stats.isNumeric) {
          const num = Number(val);
          if (isNaN(num)) {
            stats.isNumeric = false;
            stats.isInteger = false;
          } else if (stats.isInteger && !Number.isInteger(num)) {
            stats.isInteger = false;
          }
        }
      }
    }
  }

  console.log('=== CSV Inspection Results ===');
  console.log(`Total Rows:             ${rowCount}`);
  console.log(`Total Columns:          ${headers.length}`);
  console.log(`Year Range:             ${minYear} - ${maxYear}`);
  console.log(`Unique Countries:       ${uniqueCountries.size}`);
  console.log('\n--- Headers ---');
  console.log(JSON.stringify(headers, null, 2));

  console.log('\n--- Inferred Types ---');
  const inferredTypes = {};
  for (const h of headers) {
    const s = columnTypeSamples[h];
    let type = 'VARCHAR(255)';
    if (s.nonNullCount === 0) {
      type = 'VARCHAR(255)';
    } else if (s.isInteger) {
      type = 'NUMBER(38,0)';
    } else if (s.isNumeric) {
      type = 'FLOAT';
    }
    inferredTypes[h] = { type, nonNullCount: s.nonNullCount };
  }

  // Save inspection summary to a json file for easy reference
  const summary = {
    totalRows: rowCount,
    totalColumns: headers.length,
    minYear,
    maxYear,
    uniqueCountriesCount: uniqueCountries.size,
    headers,
    inferredTypes,
  };

  fs.writeFileSync(
    path.resolve(__dirname, '../data/owid_inspection_summary.json'),
    JSON.stringify(summary, null, 2)
  );

  console.log('\nInspection summary saved to backend/data/owid_inspection_summary.json');
}

inspectCsv().catch(console.error);
