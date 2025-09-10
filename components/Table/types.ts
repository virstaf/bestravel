// components/Table/types.ts
export interface TableColumn {
  key: string;
  header: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (value: any, row: TableData) => React.ReactNode;
}

export interface TableData {
  [key: string]: any;
}