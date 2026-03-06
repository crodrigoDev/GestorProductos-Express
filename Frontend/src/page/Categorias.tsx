import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import TablaCategorias from '../components/categorias/TablaCategorias';
import { crearCategoria, listarCategoriasConTotal } from '@/api';
import type { CategoriasConCount } from '@/types';

export default function CategoriasPage() {
	const [categorias, setCategorias] = useState<CategoriasConCount[]>([]);
	const [loading, setLoading] = useState(true);
	const [guardando, setGuardando] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [nombreCategoria, setNombreCategoria] = useState('');

	const cargarCategorias = async (signal?: AbortSignal) => {
		try {
			const data = await listarCategoriasConTotal(signal);
			setCategorias(data);
		} catch (err) {
			if (err instanceof DOMException && err.name === 'AbortError') return;
			setError(err instanceof Error ? err.message : 'Error desconocido');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const controller = new AbortController();
		cargarCategorias(controller.signal);
		return () => controller.abort();
	}, []);

	const handleAdd = async () => {
		const detalle = nombreCategoria.trim();
		if (!detalle) return setError('Ingresa el nombre de la categoria');

		try {
			setGuardando(true);
			setError(null);
			await crearCategoria(detalle);
			setNombreCategoria('');
			await cargarCategorias();
		} catch (err) {
			setError(err instanceof Error ? err.message : 'No se pudo crear la categoria');
		} finally {
			setGuardando(false);
		}
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
				{error && <p className="text-sm text-red-600 mb-2">{error}</p>}
				{loading ? (
					<p className="text-sm text-slate-500">Cargando categorias...</p>
				) : (
					<TablaCategorias
						categorias={categorias}
						nombreCategoria={nombreCategoria}
						onChangeNombre={setNombreCategoria}
						onAdd={handleAdd}
						isAdding={guardando}
						onEdit={handleEdit}
					/>
				)}
			</CardContent>
		</Card>
	);
}

