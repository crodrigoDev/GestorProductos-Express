import { callList, callVoid, query } from '../config/database';
import type { FiltrosProducto, Producto, CrearProducto } from '../types';

export const listarProductos = (filters: FiltrosProducto) =>
  callList<Producto>('sp_listarProductosFiltro(?, ?, ?)', [filters.estado, filters.marca, filters.categoria]);

export const cambiarEstadoProducto = (idProducto: number, idEstado: number) =>
  callVoid('sp_cambiarEstado(?, ?)', [idProducto, idEstado]);

export const agregarProducto = (p: CrearProducto) =>
  callVoid('sp_crearProducto(?, ?, ?, ?, ?, ?, ?, ?, ?)', [
    p.nombre, p.id_marca, p.id_categoria, p.descripcion,
    p.precio, p.stock, p.stock_min, p.stock_max, p.id_estado,
  ]);

export const editarProducto = (id: number, p: CrearProducto) =>
  callVoid('sp_editarProducto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
    id, p.nombre, p.id_marca, p.id_categoria, p.descripcion,
    p.precio, p.stock, p.stock_min, p.stock_max, p.id_estado,
  ]);

export const eliminarProducto = (id: number) =>
  callVoid('sp_eliminarProducto(?)', [id]);

