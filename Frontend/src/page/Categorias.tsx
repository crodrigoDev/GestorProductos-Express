import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import DataTableGestor, { type DataTableColumn } from '../components/DataTableGestor';
import { listarCategoriasConTotal } from '../api/categorias.api';
import type { CategoriasConCount } from '../types/categorias';

export default function CategoriasPage() {
	const [categorias, setCategorias] = useState<CategoriasConCount[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const columns: DataTableColumn<CategoriasConCount>[] = [
		{ header: 'ID', render: (row) => row.id },
		{ header: 'Nombre', render: (row) => row.detalle },
		{ header: 'Total Productos', render: (row) => row.total_productos },
		{ header: 'Fecha Creacion', render: (row) => new Date(row.fecha_creacion).toLocaleDateString() },
		{ header: 'Ultima Actualizacion', render: (row) => row.fecha_actualizacion ? new Date(row.fecha_actualizacion).toLocaleDateString() : '-' },
	];

	useEffect(() => {
		const controller = new AbortController();

		async function loadCategorias() {
			setLoading(true);
			setError(null);
			try {
				const data = await listarCategoriasConTotal(controller.signal);
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

	const handleAdd = () => {
		console.log('Agregar categoria');
	};

	const handleEdit = (row: CategoriasConCount) => {
		console.log('Editar categoria', row.id);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Listado de Categorias</CardTitle>
				<CardDescription>Categorias obtenidas</CardDescription>
			</CardHeader>
			<CardContent>
				{loading && <p className="text-sm text-slate-500">Cargando categorias...</p>}
				{error && <p className="text-sm text-red-600">{error}</p>}
				{!loading && !error && (
					<DataTableGestor
						columns={columns}
						rows={categorias}
						getRowKey={(row) => row.id}
						onAdd={handleAdd}
						onEdit={handleEdit}
					/>
				)}
			</CardContent>
		</Card>
	);
}

