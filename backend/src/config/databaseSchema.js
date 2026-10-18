import config from './env.js';

/**
 * Dataset Provenance & Metadata for PS1 DataMind
 */
export const DATASET_METADATA = {
  name: 'Our World in Data Energy Dataset',
  source: 'Our World in Data',
  url: 'https://catalog.ourworldindata.org/energy/owid_energy/',
  description: 'Global energy-related indicators by country or region and year, covering electricity generation, renewables, fossil fuels, demand, emissions intensity, and economic indicators.',
  recordsCount: 19494,
  yearRange: '1700 - 2025',
  countriesCount: 260,
};

/**
 * Centralized Database Schema Definition for PS1 DataMind
 * Exclusively defines the real Snowflake DATAMIND_ENERGY table.
 */
export const DATABASE_SCHEMA = {
  databaseName: config.snowflake.database || 'DATAMIND_DB',
  schemaName: config.snowflake.schema || 'PUBLIC',
  metadata: DATASET_METADATA,
  tables: [
    {
      name: 'DATAMIND_ENERGY',
      description: 'Primary energy metrics and electricity generation statistics across countries and years (1700-2025). Contains renewable energy breakdown (solar, wind, hydro), fossil fuels (coal, gas, oil), nuclear, electricity demand, generation, and carbon intensity.',
      columns: [
        {
          name: 'country',
          type: 'VARCHAR(255)',
          description: 'Geographic entity, country name, or macro region (e.g., India, China, United States, World, Africa).',
        },
        {
          name: 'year',
          type: 'NUMBER(4,0)',
          description: 'Calendar year of observation (e.g., 2020, 2021).',
        },
        {
          name: 'iso_code',
          type: 'VARCHAR(32)',
          description: 'Three-letter ISO 3166-1 alpha-3 country code (e.g., IND, CHN, USA).',
        },
        {
          name: 'population',
          type: 'NUMBER(38,0)',
          description: 'Total national population estimate for the given year.',
        },
        {
          name: 'gdp',
          type: 'FLOAT',
          description: 'Total real GDP in constant international dollars.',
        },
        {
          name: 'electricity_generation_twh',
          type: 'FLOAT',
          description: 'Total gross electricity generation measured in terawatt-hours (TWh).',
        },
        {
          name: 'electricity_demand_twh',
          type: 'FLOAT',
          description: 'Total domestic electricity consumption/demand measured in terawatt-hours (TWh).',
        },
        {
          name: 'electricity_carbon_intensity_gco2eq_per_kwh',
          type: 'FLOAT',
          description: 'Carbon intensity of electricity generation, measured in grams of CO2 equivalent per kilowatt-hour (gCO2eq/kWh).',
        },
        {
          name: 'renewables_electricity_twh',
          type: 'FLOAT',
          description: 'Electricity generated from all renewable sources combined (hydro, solar, wind, bioenergy, geothermal) in TWh.',
        },
        {
          name: 'renewables_electricity_share_pct',
          type: 'FLOAT',
          description: 'Share of total electricity generation coming from renewable sources, expressed as a percentage (0 to 100).',
        },
        {
          name: 'renewables_energy_twh',
          type: 'FLOAT',
          description: 'Primary energy consumption from renewable sources in terawatt-hours (TWh).',
        },
        {
          name: 'renewables_energy_share_pct',
          type: 'FLOAT',
          description: 'Share of total primary energy consumption coming from renewable sources, expressed as a percentage.',
        },
        {
          name: 'solar_electricity_twh',
          type: 'FLOAT',
          description: 'Electricity generated specifically from solar photovoltaic and solar thermal systems in TWh.',
        },
        {
          name: 'solar_electricity_share_pct',
          type: 'FLOAT',
          description: 'Share of total electricity generation coming from solar power, expressed as a percentage.',
        },
        {
          name: 'wind_electricity_twh',
          type: 'FLOAT',
          description: 'Electricity generated from onshore and offshore wind turbines in TWh.',
        },
        {
          name: 'wind_electricity_share_pct',
          type: 'FLOAT',
          description: 'Share of total electricity generation coming from wind power, expressed as a percentage.',
        },
        {
          name: 'hydro_electricity_twh',
          type: 'FLOAT',
          description: 'Electricity generated from conventional hydropower installations in TWh.',
        },
        {
          name: 'hydro_electricity_share_pct',
          type: 'FLOAT',
          description: 'Share of total electricity generation coming from hydropower, expressed as a percentage.',
        },
        {
          name: 'nuclear_electricity_twh',
          type: 'FLOAT',
          description: 'Electricity generated from nuclear fission reactors in TWh.',
        },
        {
          name: 'nuclear_electricity_share_pct',
          type: 'FLOAT',
          description: 'Share of total electricity generation coming from nuclear power, expressed as a percentage.',
        },
        {
          name: 'coal_electricity_twh',
          type: 'FLOAT',
          description: 'Electricity generated from coal-fired power plants in TWh.',
        },
        {
          name: 'coal_electricity_share_pct',
          type: 'FLOAT',
          description: 'Share of total electricity generation coming from coal, expressed as a percentage.',
        },
        {
          name: 'gas_electricity_twh',
          type: 'FLOAT',
          description: 'Electricity generated from natural gas thermal plants in TWh.',
        },
        {
          name: 'gas_electricity_share_pct',
          type: 'FLOAT',
          description: 'Share of total electricity generation coming from natural gas, expressed as a percentage.',
        },
        {
          name: 'oil_electricity_twh',
          type: 'FLOAT',
          description: 'Electricity generated from petroleum and oil-based fuels in TWh.',
        },
        {
          name: 'oil_electricity_share_pct',
          type: 'FLOAT',
          description: 'Share of total electricity generation coming from oil, expressed as a percentage.',
        },
        {
          name: 'fossil_fuels_electricity_twh',
          type: 'FLOAT',
          description: 'Total electricity generated from all fossil fuels combined (coal, gas, oil) in TWh.',
        },
        {
          name: 'fossil_fuels_electricity_share_pct',
          type: 'FLOAT',
          description: 'Share of total electricity generation derived from fossil fuels, expressed as a percentage.',
        },
        {
          name: 'total_energy_per_gdp_kwh_per_dollar',
          type: 'FLOAT',
          description: 'Energy intensity of the economy, measured in kilowatt-hours of primary energy consumed per international dollar of GDP.',
        },
        {
          name: 'total_energy_per_capita_kwh',
          type: 'FLOAT',
          description: 'Primary energy consumption per person, measured in kilowatt-hours per person.',
        },
        {
          name: 'total_energy_twh',
          type: 'FLOAT',
          description: 'Total primary energy consumption from all sources (fossil, nuclear, renewables) in TWh.',
        },
      ],
    },
  ],
};

export default DATABASE_SCHEMA;
