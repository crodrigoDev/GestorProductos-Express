import {
  listarProductos,
  cambiarEstadoProducto,
  type FiltrosProducto,
  type FilaProducto,
} from '../services/productos.service';
import {
  listarCategoria,
  listarCategoriaConCount,
  type Categoria,
  type CategoriaConCount,
} from '../services/categoria.service';
import {
  listarMarcas,
  listarMarcasConCount,
  type Marca,
  type MarcaConCount,
} from '../services/marcas.service';
import { listarEstados, type Estado } from '../services/estados.service';

class CatalogFacade {
  listProducts(filters: FiltrosProducto): Promise<FilaProducto[]> {
    return listarProductos(filters);
  }

  changeProductStatus(productId: number, statusId: number): Promise<void> {
    return cambiarEstadoProducto(productId, statusId);
  }

  listCategories(): Promise<Categoria[]> {
    return listarCategoria();
  }

  listCategoriesWithCount(): Promise<CategoriaConCount[]> {
    return listarCategoriaConCount();
  }

  listBrands(): Promise<Marca[]> {
    return listarMarcas();
  }

  listBrandsWithCount(): Promise<MarcaConCount[]> {
    return listarMarcasConCount();
  }

  listStates(): Promise<Estado[]> {
    return listarEstados();
  }
}

export const catalogFacade = new CatalogFacade();
