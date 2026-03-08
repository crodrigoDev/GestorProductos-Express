import * as productosService from '../services/productos.service';
import * as categoriaService from '../services/categoria.service';
import * as marcasService from '../services/marcas.service';
import * as estadosService from '../services/estados.service';
import * as dashboardService from '../services/dashboard.service';
import type {
  FiltrosProducto, Producto, CrearProducto,
  Categoria, CategoriaConCount,
  Marca, MarcaConCount,
  Estado,
  DashboardResumen, UltimaActividad, ProductosPorCategoria, ProductosPorMarca,
} from '../types';

class CatalogFacade {
  // Productos
  listarProductos(filtros: FiltrosProducto): Promise<Producto[]> {
    return productosService.listarProductos(filtros);
  }

  crearProducto(data: CrearProducto): Promise<void> {
    return productosService.agregarProducto(data);
  }

  editarProducto(id: number, data: CrearProducto): Promise<void> {
    return productosService.editarProducto(id, data);
  }

  cambiarEstado(idProducto: number, idEstado: number): Promise<void> {
    return productosService.cambiarEstadoProducto(idProducto, idEstado);
  }

  eliminarProducto(id: number): Promise<void> {
    return productosService.eliminarProducto(id);
  }

  obtenerProductoPorId(id: number): Promise<CrearProducto | null> {
    return productosService.obtenerProductoPorId(id);
  }

  // Categorias
  listarCategorias(): Promise<Categoria[]> {
    return categoriaService.listarCategoria();
  }

  listarCategoriasConCount(): Promise<CategoriaConCount[]> {
    return categoriaService.listarCategoriaConCount();
  }

  async crearCategoria(detalle: string): Promise<void> {
    const existentes = await categoriaService.listarCategoria();
    if (existentes.some(c => c.detalle.toLowerCase() === detalle.toLowerCase())) {
      throw new Error('Ya existe una categoria con ese nombre');
    }
    return categoriaService.crearCategoria(detalle);
  }

  async editarCategoria(id: number, detalle: string): Promise<void> {
    const existentes = await categoriaService.listarCategoria();
    if (existentes.some(c => c.id !== id && c.detalle.toLowerCase() === detalle.toLowerCase())) {
      throw new Error('Ya existe una categoria con ese nombre');
    }
    return categoriaService.editarCategoria(id, detalle);
  }

  obtenerCategoriaPorId(id: number): Promise<Categoria | null> {
    return categoriaService.obtenerCategoriaPorId(id);
  }

  // Marcas
  listarMarcas(): Promise<Marca[]> {
    return marcasService.listarMarcas();
  }

  listarMarcasConCount(): Promise<MarcaConCount[]> {
    return marcasService.listarMarcasConCount();
  }

  async crearMarca(detalle: string): Promise<void> {
    const existentes = await marcasService.listarMarcas();
    if (existentes.some(m => m.detalle.toLowerCase() === detalle.toLowerCase())) {
      throw new Error('Ya existe una marca con ese nombre');
    }
    return marcasService.crearMarca(detalle);
  }

  async editarMarca(id: number, detalle: string): Promise<void> {
    const existentes = await marcasService.listarMarcas();
    if (existentes.some(m => m.id !== id && m.detalle.toLowerCase() === detalle.toLowerCase())) {
      throw new Error('Ya existe una marca con ese nombre');
    }
    return marcasService.editarMarca(id, detalle);
  }

  obtenerMarcaPorId(id: number): Promise<Marca | null> {
    return marcasService.obtenerMarcaPorId(id);
  }

  // Estados
  listarEstados(): Promise<Estado[]> {
    return estadosService.listarEstados();
  }

  // Dashboard
  obtenerResumen(): Promise<DashboardResumen> {
    return dashboardService.obtenerResumen();
  }

  obtenerUltimaActividad(): Promise<UltimaActividad[]> {
    return dashboardService.obtenerUltimaActividad();
  }

  obtenerProductosPorCategoria(): Promise<ProductosPorCategoria[]> {
    return dashboardService.obtenerProductosPorCategoria();
  }

  obtenerProductosPorMarca(): Promise<ProductosPorMarca[]> {
    return dashboardService.obtenerProductosPorMarca();
  }

  obtenerProductosPorEstado() {
    return dashboardService.obtenerProductosPorEstado();
  }
}

export const catalogFacade = new CatalogFacade();
