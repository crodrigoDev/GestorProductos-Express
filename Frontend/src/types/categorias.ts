export interface Categorias {
  id: number;
  detalle: string;
}

export interface CategoriasConCount {
  id: number;
  detalle: string;
  total_productos: number;
  fecha_creacion: string;
  fecha_actualizacion: string | null;
}