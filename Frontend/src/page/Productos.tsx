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
	obtenerProductoPorId,
} from '@/api';
import ProductoForm from '../components/modal/ProductoForm';
import type { Categorias, Estado, Marcas, ProductoNuevo, Productos } from '@/types';

export default function ProductosPage() {
	const [products, setProducts] = useState<Productos[]>([]);
	const [categorias, setCategorias] = useState<Categorias[]>([]);
	const [marcas, setMarcas] = useState<Marcas[]>([]);
	const [estados, setEstados] = useState<Estado[]>([]);
	const [modalAgregarAbierto, setModalAgregarAbierto] = useState(false);
	const [idEditando, setIdEditando] = useState<number | null>(null);
	const [productoEditar, setProductoEditar] = useState<ProductoNuevo | null>(null);

	const [filtroEstado, setFiltroEstado] = useState<number | ''>('');
	const [filtroMarca, setFiltroMarca] = useState<number | ''>('');
	const [filtroCategoria, setFiltroCategoria] = useState<number | ''>('');

	const recargarProductos = async () => {
		setProducts(await listarProductos(undefined, {
			estado: filtroEstado || null,
			marca: filtroMarca || null,
			categoria: filtroCategoria || null,
		}));
	};

	useEffect(() => {
		Promise.all([listarCategorias(), listarMarcas(), listarEstados()]).then(([c, m, e]) => {
			setCategorias(c);
			setMarcas(m);
			setEstados(e);
		});
	}, []);

	useEffect(() => { recargarProductos(); }, [filtroEstado, filtroMarca, filtroCategoria]);

	const handleAdd = () => {
		setIdEditando(null);
		setProductoEditar(null);
		setModalAgregarAbierto(true);
	};

	const handleCreateProduct = async (producto: ProductoNuevo) => {
		if (idEditando) {
			await editarProducto(idEditando, producto);
		} else {
			await agregarProducto(producto);
		}
		await recargarProductos();
		setModalAgregarAbierto(false);
		setIdEditando(null);
		setProductoEditar(null);
	};

	const handleEdit = async (row: Productos) => {
		const data = await obtenerProductoPorId(row.id);
		setIdEditando(row.id);
		setProductoEditar(data);
		setModalAgregarAbierto(true);
	};

	const handleDelete = async (row: Productos) => {
		await eliminarProducto(row.id);
		await recargarProductos();
	};

	const handleCambiarEstado = async (producto: Productos, nuevoEstado: Estado) => {
		await cambiarEstadoProducto(producto.id, nuevoEstado.id);
		await recargarProductos();
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
						onClear={() => { setFiltroEstado(''); setFiltroMarca(''); setFiltroCategoria(''); }}
						estados={estados}
						marcas={marcas}
						categorias={categorias}
					/>
					<TablaProductos
						productos={products}
						estados={estados}
						onCambiarEstado={handleCambiarEstado}
						onAdd={handleAdd}
						onEdit={handleEdit}
						onDelete={handleDelete}
					/>
				</CardContent>
			</Card>

			<ProductoForm
				open={modalAgregarAbierto}
				onOpenChange={(open) => {
					setModalAgregarAbierto(open);
					if (!open) { setIdEditando(null); setProductoEditar(null); }
				}}
				categorias={categorias}
				marcas={marcas}
				estados={estados}
				onSubmit={handleCreateProduct}
				productoEditar={productoEditar}
			/>
		</>
	);
}

