import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import TablaCategorias from '../components/categorias/TablaCategorias';
import { crearCategoria, editarCategoria, listarCategoriasConTotal } from '@/api';
import type { CategoriasConCount } from '@/types';

export default function CategoriasPage() {
	const [categorias, setCategorias] = useState<CategoriasConCount[]>([]);
	const [nombreCategoria, setNombreCategoria] = useState('');
	const [editandoId, setEditandoId] = useState<number | null>(null);

	const cargarCategorias = async () => {
		setCategorias(await listarCategoriasConTotal());
	};

	useEffect(() => { cargarCategorias(); }, []);

	const handleAdd = async () => {
		const detalle = nombreCategoria.trim();
		if (!detalle) return;
		if (editandoId) {
			await editarCategoria(editandoId, detalle);
			setEditandoId(null);
		} else {
			await crearCategoria(detalle);
		}
		setNombreCategoria('');
		await cargarCategorias();
	};

	const handleEdit = (row: CategoriasConCount) => {
		setEditandoId(row.id);
		setNombreCategoria(row.detalle);
	};

	const handleCancelEdit = () => {
		setEditandoId(null);
		setNombreCategoria('');
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Listado de Categorias</CardTitle>
				<CardDescription>Categorias obtenidas</CardDescription>
			</CardHeader>
			<CardContent>
				<TablaCategorias
					categorias={categorias}
					nombreCategoria={nombreCategoria}
					onChangeNombre={setNombreCategoria}
					onAdd={handleAdd}
					onEdit={handleEdit}
					editandoId={editandoId}
					onCancelEdit={handleCancelEdit}
				/>
			</CardContent>
		</Card>
	);
}

