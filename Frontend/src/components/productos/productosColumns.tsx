import type { DataTableColumn } from '../DataTableGestor';
import { Badge } from '../ui/badge';
import type { Productos } from '../../types/productos';
import type { Estado } from '../../types/estados';

function formatFecha(fecha: string | null): string {
  if (!fecha) return '-';
  return new Date(fecha).toLocaleString();
}

function varianteEstado(nombreEstado: string): 'default' | 'secondary' | 'destructive' | 'outline' {
  const estado = nombreEstado.toLowerCase();
  if (estado === 'activo') return 'default';
  if (estado === 'inactivo') return 'secondary';
  if (estado === 'descontinuado') return 'destructive';
  return 'outline';
}

function obtenerSiguienteEstado(estados: Estado[], idEstadoActual: number): Estado | null {
  if (estados.length === 0) return null;
  const indice = estados.findIndex((e) => e.id === idEstadoActual);
  if (indice === -1) return estados[0];
  const siguienteIndice = (indice + 1) % estados.length;
  return estados[siguienteIndice];
}

type CrearColumnasProductosParams = {
  estados: Estado[];
  alCambiarEstado: (producto: Productos, nuevoEstado: Estado) => void;
  idProductoCambiando: number | null;
};

export function crearColumnasProductos({
  estados,
  alCambiarEstado,
  idProductoCambiando,
}: CrearColumnasProductosParams): DataTableColumn<Productos>[] {
  return [
    { header: 'ID', render: (row) => row.id },
    { header: 'Nombre', render: (row) => row.nombre },
    { header: 'Marca', render: (row) => row.marca },
    { header: 'Categoria', render: (row) => row.categoria },
    { header: 'Descripcion', render: (row) => row.descripcion },
    { header: 'Precio', render: (row) => `S/ ${Number(row.precio).toFixed(2)}` },
    { header: 'Stock', render: (row) => row.stock },
    { header: 'Stock Min', render: (row) => row.stock_min },
    { header: 'Stock Max', render: (row) => row.stock_max },
    {
      header: 'Estado',
      render: (row) => {
        const siguienteEstado = obtenerSiguienteEstado(estados, row.id_estado);

        return (
          <Badge
            asChild
            variant={varianteEstado(row.estado)}
            className="cursor-pointer"
          >
            <button
              type="button"
              onClick={() => siguienteEstado && alCambiarEstado(row, siguienteEstado)}
              disabled={!siguienteEstado || idProductoCambiando === row.id}
              title="Click para cambiar estado"
            >
              {idProductoCambiando === row.id ? 'Cambiando...' : row.estado}
            </button>
          </Badge>
        );
      },
    },
    { header: 'Fecha Creacion', render: (row) => formatFecha(row.fecha_creacion) },
    { header: 'Fecha Actualizacion', render: (row) => formatFecha(row.fecha_actualizacion) },
  ];
}
