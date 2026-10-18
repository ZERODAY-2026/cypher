export interface SchemaColumn {
  name: string;
  type: string;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  nullable: boolean;
  description: string;
}

export interface SchemaTable {
  name: string;
  description: string;
  rowCount: number;
  columns: SchemaColumn[];
  sampleRows: Record<string, string | number>[];
}

export interface DatabaseSchema {
  databaseName: string;
  schemaName: string;
  tables: SchemaTable[];
}
