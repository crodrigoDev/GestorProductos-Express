export interface Marcas {
  id: number;
  detalle: string;
}

export interface MarcasConCount {
  id: number;
  detalle: string;
  total_productos: number;
  fecha_creacion: string;
  fecha_actualizacion: string | null;
}