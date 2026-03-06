import type { Categorias, CategoriasConCount, Estado, FiltroProductos, Marcas, MarcasConCount, ProductoNuevo, Productos } from '@/types';

const API = 'http://localhost:3000/api';

// Categorias
export async function listarCategorias(signal?: AbortSignal) {
  const res = await fetch(`${API}/categorias`, { signal });
  return (await res.json()) as Categorias[];
}

export async function listarCategoriasConTotal(signal?: AbortSignal) {
  const res = await fetch(`${API}/categorias/con-count`, { signal });
  return (await res.json()) as CategoriasConCount[];
}

export async function crearCategoria(detalle: string) {
  await fetch(`${API}/categorias`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ detalle }),
  });
}

// Estados
export async function listarEstados(signal?: AbortSignal) {
  const res = await fetch(`${API}/estados`, { signal });
  return (await res.json()) as Estado[];
}

// Marcas
export async function listarMarcas(signal?: AbortSignal) {
  const res = await fetch(`${API}/marcas`, { signal });
  return (await res.json()) as Marcas[];
}

export async function listarMarcasConTotal(signal?: AbortSignal) {
  const res = await fetch(`${API}/marcas/con-count`, { signal });
  return (await res.json()) as MarcasConCount[];
}

export async function crearMarca(detalle: string) {
  await fetch(`${API}/marcas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ detalle }),
  });
}

// Productos
export async function listarProductos(signal?: AbortSignal, filtros?: FiltroProductos) {
  const params = new URLSearchParams();
  if (filtros?.estado) params.append('estado', String(filtros.estado));
  if (filtros?.marca) params.append('marca', String(filtros.marca));
  if (filtros?.categoria) params.append('categoria', String(filtros.categoria));
  const query = params.toString();
  const res = await fetch(`${API}/productos${query ? `?${query}` : ''}`, { signal });
  return (await res.json()) as Productos[];
}

export async function cambiarEstadoProducto(idProducto: number, idEstado: number) {
  await fetch(`${API}/productos/${idProducto}/estado`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id_estado: idEstado }),
  });
}

export async function agregarProducto(producto: ProductoNuevo) {
  await fetch(`${API}/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  });
}
