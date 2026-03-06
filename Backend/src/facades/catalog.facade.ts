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

  crearCategoria(detalle: string): Promise<void> {
    return categoriaService.crearCategoria(detalle);
  }

  editarCategoria(id: number, detalle: string): Promise<void> {
    return categoriaService.editarCategoria(id, detalle);
  }

  // Marcas
  listarMarcas(): Promise<Marca[]> {
    return marcasService.listarMarcas();
  }

  listarMarcasConCount(): Promise<MarcaConCount[]> {
    return marcasService.listarMarcasConCount();
  }

  crearMarca(detalle: string): Promise<void> {
    return marcasService.crearMarca(detalle);
  }

  editarMarca(id: number, detalle: string): Promise<void> {
    return marcasService.editarMarca(id, detalle);
  }

  // Estados
  listarEstados(): Promise<Estado[]> {
    return estadosService.listarEstados();
  }
}

export const catalogFacade = new CatalogFacade();
