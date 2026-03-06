export interface Productos {
  id: number;
  nombre: string;
  id_marca: number;
  id_categoria: number;
  marca: string;
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
}