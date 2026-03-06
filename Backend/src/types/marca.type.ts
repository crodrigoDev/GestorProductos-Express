export type Marca = {
  id: number;
  detalle: string;
};

export type MarcaConCount = {
  id: number;
  detalle: string;
  total_productos: number;
  fecha_creacion: string;
  fecha_actualizacion: string | null;
};
