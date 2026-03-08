import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import TablaMarcas from '../components/marcas/TablaMarcas';
import { crearMarca, editarMarca, listarMarcasConTotal } from '@/api';
import type { MarcasConCount } from '@/types';

export default function MarcasPage() {
	const [marcas, setMarcas] = useState<MarcasConCount[]>([]);
	const [nombreMarca, setNombreMarca] = useState('');
	const [editandoId, setEditandoId] = useState<number | null>(null);

	const cargarMarcas = async () => {
		setMarcas(await listarMarcasConTotal());
	};

	useEffect(() => { cargarMarcas(); }, []);

	const handleAdd = async () => {
		const detalle = nombreMarca.trim();
		if (!detalle) return;
		if (editandoId) {
			await editarMarca(editandoId, detalle);
			setEditandoId(null);
		} else {
			await crearMarca(detalle);
		}
		setNombreMarca('');
		await cargarMarcas();
	};

	const handleEdit = (row: MarcasConCount) => {
		setEditandoId(row.id);
		setNombreMarca(row.detalle);
	};

	const handleCancelEdit = () => {
		setEditandoId(null);
		setNombreMarca('');
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Listado de Marcas</CardTitle>
				<CardDescription>Marcas obtenidas</CardDescription>
			</CardHeader>
			<CardContent>
				<TablaMarcas
					marcas={marcas}
					nombreMarca={nombreMarca}
					onChangeNombre={setNombreMarca}
					onAdd={handleAdd}
					onEdit={handleEdit}
					editandoId={editandoId}
					onCancelEdit={handleCancelEdit}
				/>
			</CardContent>
		</Card>
	);
}

