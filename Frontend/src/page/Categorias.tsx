import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import DataTableGestor, { type DataTableColumn } from '../components/DataTableGestor';
import { getCategorias } from '../api/categorias.api';
import type { Categorias } from '../types/categorias';

export default function CategoriasPage() {
	const [categorias, setCategorias] = useState<Categorias[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const columns: DataTableColumn<Categorias>[] = [
		{ header: 'ID', render: (row) => row.id },
		{ header: 'Nombre', render: (row) => row.nombre ?? row.detalle ?? '-' },
	];

	useEffect(() => {
		const controller = new AbortController();

		async function loadCategorias() {
			setLoading(true);
			setError(null);
			try {
				const data = await getCategorias(controller.signal);
				setCategorias(data);
			} catch (err) {
				if (err instanceof DOMException && err.name === 'AbortError') {
					return;
				}
				setError(err instanceof Error ? err.message : 'Error desconocido');
			} finally {
				setLoading(false);
			}
		}

		loadCategorias();
		return () => controller.abort();
	}, []);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Listado de Categorias</CardTitle>
				<CardDescription>Categorias obtenidas</CardDescription>
			</CardHeader>
			<CardContent>
				{loading && <p className="text-sm text-slate-500">Cargando categorias...</p>}
				{error && <p className="text-sm text-red-600">{error}</p>}
				{!loading && !error && <DataTableGestor columns={columns} rows={categorias} getRowKey={(row) => row.id} />}
			</CardContent>
		</Card>
	);
}

