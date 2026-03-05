import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import DataTableGestor, { type DataTableColumn } from '../components/DataTableGestor';
import { getMarcas } from '../api/marcas.api';
import type { Marcas } from '../types/marcas';

export default function MarcasPage() {
	const [marcas, setMarcas] = useState<Marcas[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const columns: DataTableColumn<Marcas>[] = [
		{ header: 'ID', render: (row) => row.id },
		{ header: 'Nombre', render: (row) => row.nombre ?? row.detalle ?? '-' },
	];

	useEffect(() => {
		const controller = new AbortController();

		async function loadMarcas() {
			setLoading(true);
			setError(null);
			try {
				const data = await getMarcas(controller.signal);
				setMarcas(data);
			} catch (err) {
				if (err instanceof DOMException && err.name === 'AbortError') {
					return;
				}
				setError(err instanceof Error ? err.message : 'Error desconocido');
			} finally {
				setLoading(false);
			}
		}

		loadMarcas();
		return () => controller.abort();
	}, []);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Listado de Marcas</CardTitle>
				<CardDescription>Marcas obtenidas</CardDescription>
			</CardHeader>
			<CardContent>
				{loading && <p className="text-sm text-slate-500">Cargando marcas...</p>}
				{error && <p className="text-sm text-red-600">{error}</p>}
				{!loading && !error && <DataTableGestor columns={columns} rows={marcas} getRowKey={(row) => row.id} />}
			</CardContent>
		</Card>
	);
}

