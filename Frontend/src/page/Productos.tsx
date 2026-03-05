import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import DataTableGestor, { type DataTableColumn } from '../components/DataTableGestor';
import { getProductos } from '../api/productos.api';
import type { Productos } from '../types/productos';

export default function ProductosPage() {
	const [products, setProducts] = useState<Productos[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const columns: DataTableColumn<Productos>[] = [
		{ header: 'ID', render: (row) => row.id },
		{ header: 'Nombre', render: (row) => row.nombre },
		{ header: 'Marca', render: (row) => row.marca },
		{ header: 'Categoria', render: (row) => row.categoria },
		{ header: 'Precio', render: (row) => `S/ ${Number(row.precio).toFixed(2)}` },
		{ header: 'Stock', render: (row) => row.stock },
		{ header: 'Estado', render: (row) => row.estado },
	];

	useEffect(() => {
		const controller = new AbortController();

		async function loadProducts() {
			setLoading(true);
			setError(null);
			try {
				const data = await getProductos(controller.signal);
				setProducts(data);
			} catch (err) {
				if (err instanceof DOMException && err.name === 'AbortError') {
					return;
				}
				setError(err instanceof Error ? err.message : 'Error desconocido');
			} finally {
				setLoading(false);
			}
		}

		loadProducts();
		return () => controller.abort();
	}, []);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Listado de Productos</CardTitle>
				<CardDescription>Productos obtenidos</CardDescription>
			</CardHeader>
			<CardContent>
				{loading && <p className="text-sm text-slate-500">Cargando productos...</p>}
				{error && <p className="text-sm text-red-600">{error}</p>}
				{!loading && !error && <DataTableGestor columns={columns} rows={products} getRowKey={(row) => row.id} />}
			</CardContent>
		</Card>
	);
}

