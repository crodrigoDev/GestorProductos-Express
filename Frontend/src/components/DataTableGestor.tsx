import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
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
  onAdd?: () => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
};

export default function DataTableGestor<T>({
  columns,
  rows,
  getRowKey,
  emptyMessage = 'Sin datos para mostrar',
  onAdd,
  onEdit,
  onDelete,
}: DataTableGestorProps<T>) {
  const hasActions = onEdit || onDelete;

  return (
    <div className="w-full max-w-full overflow-hidden">
      {onAdd && (
        <div className="mb-4">
          <Button onClick={onAdd}>Agregar</Button>
        </div>
      )}

      {rows.length === 0 ? (
        <p className="text-sm text-slate-500">{emptyMessage}</p>
      ) : (
        <ScrollArea className="h-96 w-full max-w-full rounded-md border">
          <div className="min-w-max">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column.header}>{column.header}</TableHead>
                  ))}
                  {hasActions && <TableHead>Acciones</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={getRowKey(row)}>
                    {columns.map((column) => (
                      <TableCell key={column.header}>{column.render(row)}</TableCell>
                    ))}
                    {hasActions && (
                      <TableCell>
                        <div className="flex gap-2">
                          {onEdit && (
                            <Button variant="outline" size="sm" onClick={() => onEdit(row)}>
                              Editar
                            </Button>
                          )}
                          {onDelete && (
                            <Button variant="destructive" size="sm" onClick={() => onDelete(row)}>
                              Eliminar
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <ScrollBar orientation="horizontal" />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      )}
    </div>
  );
}
