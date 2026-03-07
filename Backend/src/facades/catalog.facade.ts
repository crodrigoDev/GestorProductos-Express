import * as productosService from '../services/productos.service';
import * as categoriaService from '../services/categoria.service';
import * as marcasService from '../services/marcas.service';
import * as estadosService from '../services/estados.service';
import type {
  FiltrosProducto, Producto, CrearProducto,
  Categoria, CategoriaConCount,
  Marca, MarcaConCount,
  Estado,
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

  // Estados
  listarEstados(): Promise<Estado[]> {
    return estadosService.listarEstados();
  }
}

export const catalogFacade = new CatalogFacade();
