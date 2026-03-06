import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import TablaMarcas from '../components/marcas/TablaMarcas';
import { crearMarca, editarMarca, listarMarcasConTotal } from '@/api';
import type { MarcasConCount } from '@/types';

export default function MarcasPage() {
	const [marcas, setMarcas] = useState<MarcasConCount[]>([]);
	const [loading, setLoading] = useState(true);
	const [guardando, setGuardando] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [nombreMarca, setNombreMarca] = useState('');
	const [editandoId, setEditandoId] = useState<number | null>(null);

	const cargarMarcas = async (signal?: AbortSignal) => {
		try {
			const data = await listarMarcasConTotal(signal);
			setMarcas(data);
		} catch (err) {
			if (err instanceof DOMException && err.name === 'AbortError') return;
			setError(err instanceof Error ? err.message : 'Error desconocido');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const controller = new AbortController();
		cargarMarcas(controller.signal);
		return () => controller.abort();
	}, []);

	const handleAdd = async () => {
		const detalle = nombreMarca.trim();
		if (!detalle) return setError('Ingresa el nombre de la marca');

		try {
			setGuardando(true);
			setError(null);
			if (editandoId) {
				await editarMarca(editandoId, detalle);
				setEditandoId(null);
			} else {
				await crearMarca(detalle);
			}
			setNombreMarca('');
			await cargarMarcas();
		} catch (err) {
			setError(err instanceof Error ? err.message : 'No se pudo guardar la marca');
		} finally {
			setGuardando(false);
		}
	};

	const handleEdit = (row: MarcasConCount) => {
		setEditandoId(row.id);
		setNombreMarca(row.detalle);
		setError(null);
	};

	const handleCancelEdit = () => {
		setEditandoId(null);
		setNombreMarca('');
		setError(null);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Listado de Marcas</CardTitle>
				<CardDescription>Marcas obtenidas</CardDescription>
			</CardHeader>
			<CardContent>
				{error && <p className="text-sm text-red-600 mb-2">{error}</p>}
				{loading ? (
					<p className="text-sm text-slate-500">Cargando marcas...</p>
				) : (
					<TablaMarcas
						marcas={marcas}
						nombreMarca={nombreMarca}
						onChangeNombre={setNombreMarca}
						onAdd={handleAdd}
						isAdding={guardando}
						onEdit={handleEdit}
						editandoId={editandoId}
						onCancelEdit={handleCancelEdit}
					/>
				)}
			</CardContent>
		</Card>
	);
}

