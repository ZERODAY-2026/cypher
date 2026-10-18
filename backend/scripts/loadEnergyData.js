import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse';
import snowflake from 'snowflake-sdk';
import config from '../src/config/env.js';
import { getSnowflakeConfig, isSnowflakeConfigured } from '../src/config/snowflake.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const csvPath = path.resolve(__dirname, '../data/owid_energy.csv');

// Selected 31 focused columns from OWID Energy CSV
const SELECTED_COLUMNS = [
  'country',
  'year',
  'iso_code',
  'population',
  'gdp',
  'electricity_generation_twh',
  'electricity_demand_twh',
  'electricity_carbon_intensity_gco2eq_per_kwh',
  'renewables_electricity_twh',
  'renewables_electricity_share_pct',
  'renewables_energy_twh',
  'renewables_energy_share_pct',
  'solar_electricity_twh',
  'solar_electricity_share_pct',
  'wind_electricity_twh',
  'wind_electricity_share_pct',
  'hydro_electricity_twh',
  'hydro_electricity_share_pct',
  'nuclear_electricity_twh',
  'nuclear_electricity_share_pct',
  'coal_electricity_twh',
  'coal_electricity_share_pct',
  'gas_electricity_twh',
  'gas_electricity_share_pct',
  'oil_electricity_twh',
  'oil_electricity_share_pct',
  'fossil_fuels_electricity_twh',
  'fossil_fuels_electricity_share_pct',
  'total_energy_per_gdp_kwh_per_dollar',
  'total_energy_per_capita_kwh',
  'total_energy_twh',
];

const INTEGER_COLUMNS = new Set(['year', 'population']);
const STRING_COLUMNS = new Set(['country', 'iso_code']);

function cleanValue(column, rawVal) {
  if (rawVal === undefined || rawVal === null || rawVal === '') {
    return null;
  }
  const trimmed = String(rawVal).trim();
  if (trimmed === '') {
    return null;
  }

  if (STRING_COLUMNS.has(column)) {
    return trimmed;
  }

  if (INTEGER_COLUMNS.has(column)) {
    const parsedInt = parseInt(trimmed, 10);
    return isNaN(parsedInt) ? null : parsedInt;
  }

  // Float numeric
  const parsedFloat = Number(trimmed);
  return isNaN(parsedFloat) ? null : parsedFloat;
}

function executeQuery(conn, sqlText, binds = []) {
  return new Promise((resolve, reject) => {
    conn.execute({
      sqlText,
      binds,
      complete: (err, stmt, rows) => {
        if (err) return reject(err);
        resolve({ stmt, rows });
      },
    });
  });
}

async function loadEnergyData() {
  console.log('====================================================');
  console.log(' PS1 DataMind — OWID Energy Data Snowflake Ingestion');
  console.log('====================================================\n');

  // 1. Verify CSV exists
  if (!fs.existsSync(csvPath)) {
    console.error(`[Error] CSV file not found at: ${csvPath}`);
    process.exit(1);
  }
  console.log(`[1/6] Found dataset: ${csvPath}`);

  // 2. Verify Snowflake configuration
  if (!isSnowflakeConfigured()) {
    console.error(
      '\n[Error] Snowflake credentials are not configured in backend/.env.'
    );
    console.error('Please configure the following in backend/.env before running ingestion:');
    console.error('  - SNOWFLAKE_ACCOUNT');
    console.error('  - SNOWFLAKE_USERNAME');
    console.error('  - SNOWFLAKE_PASSWORD');
    console.error('  - SNOWFLAKE_DATABASE');
    console.error('  - SNOWFLAKE_SCHEMA');
    console.error('  - SNOWFLAKE_WAREHOUSE\n');
    process.exit(1);
  }

  const sfConfig = getSnowflakeConfig();
  console.log(`[2/6] Connecting to Snowflake (Account: ${sfConfig.account}, DB: ${sfConfig.database || 'DEFAULT'}, Schema: ${sfConfig.schema || 'DEFAULT'})...`);

  const connection = snowflake.createConnection(sfConfig);

  await new Promise((resolve, reject) => {
    connection.connect((err, conn) => {
      if (err) return reject(err);
      resolve(conn);
    });
  });
  console.log('       Connected successfully to Snowflake.');

  try {
    // 3. Create or Replace DATAMIND_ENERGY table
    console.log('\n[3/6] Creating/re-creating table DATAMIND_ENERGY in Snowflake...');
    const ddl = `
      CREATE OR REPLACE TABLE DATAMIND_ENERGY (
        country VARCHAR(255) NOT NULL,
        year NUMBER(4,0) NOT NULL,
        iso_code VARCHAR(32),
        population NUMBER(38,0),
        gdp FLOAT,
        electricity_generation_twh FLOAT,
        electricity_demand_twh FLOAT,
        electricity_carbon_intensity_gco2eq_per_kwh FLOAT,
        renewables_electricity_twh FLOAT,
        renewables_electricity_share_pct FLOAT,
        renewables_energy_twh FLOAT,
        renewables_energy_share_pct FLOAT,
        solar_electricity_twh FLOAT,
        solar_electricity_share_pct FLOAT,
        wind_electricity_twh FLOAT,
        wind_electricity_share_pct FLOAT,
        hydro_electricity_twh FLOAT,
        hydro_electricity_share_pct FLOAT,
        nuclear_electricity_twh FLOAT,
        nuclear_electricity_share_pct FLOAT,
        coal_electricity_twh FLOAT,
        coal_electricity_share_pct FLOAT,
        gas_electricity_twh FLOAT,
        gas_electricity_share_pct FLOAT,
        oil_electricity_twh FLOAT,
        oil_electricity_share_pct FLOAT,
        fossil_fuels_electricity_twh FLOAT,
        fossil_fuels_electricity_share_pct FLOAT,
        total_energy_per_gdp_kwh_per_dollar FLOAT,
        total_energy_per_capita_kwh FLOAT,
        total_energy_twh FLOAT
      );
    `;
    await executeQuery(connection, ddl);
    console.log('       Table DATAMIND_ENERGY created successfully.');

    // 4. Parse CSV & Batch Insert
    console.log('\n[4/6] Parsing CSV and inserting records in batches of 250...');
    const parser = fs.createReadStream(csvPath).pipe(
      parse({
        columns: true,
        skip_empty_lines: true,
        relax_column_count: true,
        trim: true,
      })
    );

    const BATCH_SIZE = 250;
    let batch = [];
    let totalInserted = 0;
    const startTime = Date.now();

    for await (const record of parser) {
      const rowValues = SELECTED_COLUMNS.map((col) => cleanValue(col, record[col]));
      batch.push(rowValues);

      if (batch.length >= BATCH_SIZE) {
        await insertBatch(connection, batch);
        totalInserted += batch.length;
        process.stdout.write(`       Inserted ${totalInserted} rows...\r`);
        batch = [];
      }
    }

    // Flush remaining rows
    if (batch.length > 0) {
      await insertBatch(connection, batch);
      totalInserted += batch.length;
    }

    const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\n[4/6] Completed: Inserted ${totalInserted} rows in ${elapsedSec}s.`);

    // 5. Verification Queries
    console.log('\n[5/6] Verifying loaded data in Snowflake...');
    const countRes = await executeQuery(
      connection,
      'SELECT COUNT(*) AS ROW_COUNT FROM DATAMIND_ENERGY;'
    );
    const rangeRes = await executeQuery(
      connection,
      'SELECT MIN(year) AS MIN_YEAR, MAX(year) AS MAX_YEAR FROM DATAMIND_ENERGY;'
    );
    const countryRes = await executeQuery(
      connection,
      'SELECT COUNT(DISTINCT country) AS COUNTRY_COUNT FROM DATAMIND_ENERGY;'
    );
    const sampleRes = await executeQuery(
      connection,
      "SELECT country, year, renewables_electricity_share_pct FROM DATAMIND_ENERGY WHERE country = 'India' ORDER BY year DESC LIMIT 3;"
    );

    console.log('       Total Rows:        ', countRes.rows[0]?.ROW_COUNT ?? countRes.rows[0]?.[0]);
    console.log('       Min Year:          ', rangeRes.rows[0]?.MIN_YEAR ?? rangeRes.rows[0]?.[0]);
    console.log('       Max Year:          ', rangeRes.rows[0]?.MAX_YEAR ?? rangeRes.rows[0]?.[1]);
    console.log('       Unique Countries:  ', countryRes.rows[0]?.COUNTRY_COUNT ?? countryRes.rows[0]?.[0]);
    console.log('\n       Sample verification rows (India):');
    console.table(sampleRes.rows);

    console.log('\n[6/6] Closing Snowflake connection cleanly...');
  } finally {
    await new Promise((resolve) => {
      connection.destroy(() => resolve());
    });
    console.log('       Connection closed.');
  }

  console.log('\n====================================================');
  console.log(' Ingestion Complete: DATAMIND_ENERGY is ready!');
  console.log('====================================================');
}

async function insertBatch(conn, batch) {
  const rowPlaceholders = `(${SELECTED_COLUMNS.map(() => '?').join(', ')})`;
  const allPlaceholders = batch.map(() => rowPlaceholders).join(', ');
  const sql = `INSERT INTO DATAMIND_ENERGY (${SELECTED_COLUMNS.join(', ')}) VALUES ${allPlaceholders};`;
  const binds = batch.flat();
  await executeQuery(conn, sql, binds);
}

loadEnergyData().catch((err) => {
  console.error('\n[Fatal Error during ingestion]:', err.message);
  process.exit(1);
});
