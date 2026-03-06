export type Categoria = {
  id: number;
  detalle: string;
};

export type CategoriaConCount = {
  id: number;
  detalle: string;
  total_productos: number;
  fecha_creacion: string;
  fecha_actualizacion: string | null;
};
