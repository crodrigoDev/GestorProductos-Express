import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import TablaProductos from '../components/productos/TablaProductos';
import ProductosFiltros from '../components/productos/ProductosFiltros';
import {
	agregarProducto,
	editarProducto,
	eliminarProducto,
	cambiarEstadoProducto,
	listarCategorias,
	listarEstados,
	listarMarcas,
	listarProductos,
} from '@/api';
import ProductoAgregar from '../components/modal/ProductoAgregar';
import type { Categorias, Estado, Marcas, ProductoNuevo, Productos } from '@/types';

export default function ProductosPage() {
	const [products, setProducts] = useState<Productos[]>([]);
	const [categorias, setCategorias] = useState<Categorias[]>([]);
	const [marcas, setMarcas] = useState<Marcas[]>([]);
	const [estados, setEstados] = useState<Estado[]>([]);
	const [idProductoCambiando, setIdProductoCambiando] = useState<number | null>(null);
	const [modalAgregarAbierto, setModalAgregarAbierto] = useState(false);
	const [guardandoProducto, setGuardandoProducto] = useState(false);
	const [productoEditando, setProductoEditando] = useState<Productos | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Filtros
	const [filtroEstado, setFiltroEstado] = useState<number | ''>('');
	const [filtroMarca, setFiltroMarca] = useState<number | ''>('');
	const [filtroCategoria, setFiltroCategoria] = useState<number | ''>('');

	async function recargarProductos(signal?: AbortSignal) {
		const data = await listarProductos(signal, {
			estado: filtroEstado || null,
			marca: filtroMarca || null,
			categoria: filtroCategoria || null,
		});
		setProducts(data);
	}

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
				await recargarProductos(controller.signal);
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
		setError(null);
		setProductoEditando(null);
		setModalAgregarAbierto(true);
	};

	const handleCreateProduct = async (producto: ProductoNuevo) => {
		try {
			setGuardandoProducto(true);
			if (productoEditando) {
				await editarProducto(productoEditando.id, producto);
			} else {
				await agregarProducto(producto);
			}
			await recargarProductos();

			setModalAgregarAbierto(false);
			setProductoEditando(null);
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'No se pudo guardar el producto');
		} finally {
			setGuardandoProducto(false);
		}
	};

	const handleEdit = (row: Productos) => {
		setError(null);
		setProductoEditando(row);
		setModalAgregarAbierto(true);
	};

	const handleDelete = async (row: Productos) => {
		try {
			setError(null);
			await eliminarProducto(row.id);
			await recargarProductos();
		} catch (err) {
			setError(err instanceof Error ? err.message : 'No se pudo eliminar el producto');
		}
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
			await recargarProductos();
		} catch (err) {
			setError(err instanceof Error ? err.message : 'No se pudo cambiar el estado');
		} finally {
			setIdProductoCambiando(null);
		}
	};

	return (
		<>
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
						<TablaProductos
							productos={products}
							estados={estados}
							idProductoCambiando={idProductoCambiando}
							onCambiarEstado={handleCambiarEstado}
							onAdd={handleAdd}
							onEdit={handleEdit}
							onDelete={handleDelete}
						/>
					)}
				</CardContent>
			</Card>

			<ProductoAgregar
				open={modalAgregarAbierto}
				onOpenChange={(open) => {
					setModalAgregarAbierto(open);
					if (!open) setProductoEditando(null);
				}}
				categorias={categorias}
				marcas={marcas}
				estados={estados}
				onSubmit={handleCreateProduct}
				isSubmitting={guardandoProducto}
				productoEditar={productoEditando}
			/>
		</>
	);
}

