export type FiltrosProducto = {
  estado: number | null;
  marca: number | null;
  categoria: number | null;
};

export type Producto = {
  id: number;
  nombre: string;
  id_marca: number;
  marca: string;
  id_categoria: number;
  categoria: string;
  descripcion: string;
  precio: number;
  stock: number;
  stock_min: number;
  stock_max: number;
  id_estado: number;
  estado: string;
  fecha_creacion: string;
  fecha_actualizacion: string | null;
};

export type CrearProducto = {
  nombre: string;
  id_marca: number;
  id_categoria: number;
  descripcion: string;
  precio: number;
  stock: number;
  stock_min: number;
  stock_max: number;
  id_estado: number;
};
