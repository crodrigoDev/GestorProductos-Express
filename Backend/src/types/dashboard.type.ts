export type DashboardResumen = {
  total_productos: number;
  total_marcas: number;
  total_categorias: number;
};

export type UltimaActividad = {
  tipo: string;
  nombre: string;
  fecha_actualizacion: string;
};

export type UltimaCreacion = {
  tipo: string;
  nombre: string;
  fecha_creacion: string;
}

export type ProductosPorCategoria = {
  categoria: string;
  total_productos: number;
};

export type ProductosPorMarca = {
  marca: string;
  total_productos: number;
};

export type ProductosPorEstado = {
  estado: string;
  total_productos: number;
};
