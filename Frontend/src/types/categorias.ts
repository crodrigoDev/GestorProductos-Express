export interface Categorias {
  id: number;
  nombre?: string;
  detalle?: string;
}

export interface CategoriasConCount {
  id: number;
  detalle: string;
  total_productos: number;
  fecha_creacion: string;
  fecha_actualizacion: string | null;
}