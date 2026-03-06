import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import DataTableGestor from '../components/DataTableGestor';
import ProductosFiltros from '../components/productos/ProductosFiltros';
import { crearColumnasProductos } from '../components/productos/productosColumns';
import { listarProductos, cambiarEstadoProducto } from '../api/productos.api';
import { listarCategorias } from '../api/categorias.api';
import { listarMarcas } from '../api/marcas.api';
import { listarEstados } from '../api/estados.api';
import type { Productos } from '../types/productos';
import type { Categorias } from '../types/categorias';
import type { Marcas } from '../types/marcas';
import type { Estado } from '../types/estados';

export default function ProductosPage() {
	const [products, setProducts] = useState<Productos[]>([]);
	const [categorias, setCategorias] = useState<Categorias[]>([]);
	const [marcas, setMarcas] = useState<Marcas[]>([]);
	const [estados, setEstados] = useState<Estado[]>([]);
	const [idProductoCambiando, setIdProductoCambiando] = useState<number | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Filtros
	const [filtroEstado, setFiltroEstado] = useState<number | ''>('');
	const [filtroMarca, setFiltroMarca] = useState<number | ''>('');
	const [filtroCategoria, setFiltroCategoria] = useState<number | ''>('');

	// Cargar categorias y marcas para los filtros
	useEffect(() => {
		const controller = new AbortController();

		async function loadFilters() {
			try {
				const [categoriasData, marcasData, estadosData] = await Promise.all([
					listarCategorias(controller.signal),
					listarMarcas(controller.signal),
					listarEstados(controller.signal),
				]);
				setCategorias(categoriasData);
				setMarcas(marcasData);
				setEstados(estadosData);
			} catch (err) {
				if (err instanceof DOMException && err.name === 'AbortError') return;
				setError(err instanceof Error ? err.message : 'Error al cargar filtros');
			}
		}

		loadFilters();
		return () => controller.abort();
	}, []);

	// Cargar productos cuando cambien los filtros
	useEffect(() => {
		const controller = new AbortController();

		async function loadProducts() {
			setLoading(true);
			setError(null);
			try {
				const data = await listarProductos(controller.signal, {
					estado: filtroEstado || null,
					marca: filtroMarca || null,
					categoria: filtroCategoria || null,
				});
				setProducts(data);
			} catch (err) {
				if (err instanceof DOMException && err.name === 'AbortError') return;
				setError(err instanceof Error ? err.message : 'Error desconocido');
			} finally {
				setLoading(false);
			}
		}

		loadProducts();
		return () => controller.abort();
	}, [filtroEstado, filtroMarca, filtroCategoria]);

	const handleAdd = () => {
		console.log('Agregar producto');
	};

	const handleEdit = (row: Productos) => {
		console.log('Editar producto', row.id);
	};

	const handleDelete = (row: Productos) => {
		console.log('Eliminar producto', row.id);
	};

	const handleClearFilters = () => {
		setFiltroEstado('');
		setFiltroMarca('');
		setFiltroCategoria('');
	};

	const handleCambiarEstado = async (producto: Productos, nuevoEstado: Estado) => {
		try {
			setIdProductoCambiando(producto.id);
			await cambiarEstadoProducto(producto.id, nuevoEstado.id);

			// Vuelve a pedir la lista con los filtros activos para mantener la tabla consistente.
			const data = await listarProductos(undefined, {
				estado: filtroEstado || null,
				marca: filtroMarca || null,
				categoria: filtroCategoria || null,
			});
			setProducts(data);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'No se pudo cambiar el estado');
		} finally {
			setIdProductoCambiando(null);
		}
	};

	const columnas = crearColumnasProductos({
		estados,
		alCambiarEstado: handleCambiarEstado,
		idProductoCambiando,
	});

	return (
		<Card className="w-full max-w-full overflow-hidden">
			<CardHeader>
				<CardTitle>Listado de Productos</CardTitle>
				<CardDescription>Productos obtenidos</CardDescription>
			</CardHeader>
			<CardContent className="min-w-0 overflow-hidden">
				<ProductosFiltros
					filtroEstado={filtroEstado}
					filtroMarca={filtroMarca}
					filtroCategoria={filtroCategoria}
					onChangeEstado={setFiltroEstado}
					onChangeMarca={setFiltroMarca}
					onChangeCategoria={setFiltroCategoria}
					onClear={handleClearFilters}
					estados={estados}
					marcas={marcas}
					categorias={categorias}
				/>

				{loading && <p className="text-sm text-slate-500">Cargando productos...</p>}
				{error && <p className="text-sm text-red-600">{error}</p>}
				{!loading && !error && (
					<DataTableGestor
						columns={columnas}
						rows={products}
						getRowKey={(row) => row.id}
						onAdd={handleAdd}
						onEdit={handleEdit}
						onDelete={handleDelete}
					/>
				)}
			</CardContent>
		</Card>
	);
}

