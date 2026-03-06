import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import DataTableGestor, { type DataTableColumn } from '../components/DataTableGestor';
import { listarMarcasConTotal } from '../api/marcas.api';
import type { MarcasConCount } from '../types/marcas';

export default function MarcasPage() {
	const [marcas, setMarcas] = useState<MarcasConCount[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const columns: DataTableColumn<MarcasConCount>[] = [
		{ header: 'ID', render: (row) => row.id },
		{ header: 'Nombre', render: (row) => row.detalle },
		{ header: 'Total Productos', render: (row) => row.total_productos },
		{ header: 'Fecha Creacion', render: (row) => new Date(row.fecha_creacion).toLocaleDateString() },
		{ header: 'Ultima Actualizacion', render: (row) => row.fecha_actualizacion ? new Date(row.fecha_actualizacion).toLocaleDateString() : '-' },
	];

	useEffect(() => {
		const controller = new AbortController();

		async function loadMarcas() {
			setLoading(true);
			setError(null);
			try {
				const data = await listarMarcasConTotal(controller.signal);
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

	const handleAdd = () => {
		console.log('Agregar marca');
	};

	const handleEdit = (row: MarcasConCount) => {
		console.log('Editar marca', row.id);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Listado de Marcas</CardTitle>
				<CardDescription>Marcas obtenidas</CardDescription>
			</CardHeader>
			<CardContent>
				{loading && <p className="text-sm text-slate-500">Cargando marcas...</p>}
				{error && <p className="text-sm text-red-600">{error}</p>}
				{!loading && !error && (
					<DataTableGestor
						columns={columns}
						rows={marcas}
						getRowKey={(row) => row.id}
						onAdd={handleAdd}
						onEdit={handleEdit}
					/>
				)}
			</CardContent>
		</Card>
	);
}

