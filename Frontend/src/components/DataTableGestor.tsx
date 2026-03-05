import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import type { ReactNode } from 'react';

export type DataTableColumn<T> = {
  header: string;
  render: (row: T) => ReactNode;
};

type DataTableGestorProps<T> = {
  columns: DataTableColumn<T>[];
  rows: T[];
  getRowKey: (row: T) => string | number;
  emptyMessage?: string;
};

export default function DataTableGestor<T>({
  columns,
  rows,
  getRowKey,
  emptyMessage = 'Sin datos para mostrar',
}: DataTableGestorProps<T>) {
  if (rows.length === 0) {
    return <p className="text-sm text-slate-500">{emptyMessage}</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.header}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={getRowKey(row)}>
            {columns.map((column) => (
              <TableCell key={column.header}>{column.render(row)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
