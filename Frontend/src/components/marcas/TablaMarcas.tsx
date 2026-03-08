import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import type { MarcasConCount } from '@/types';
import { formatFecha } from '@/helpers/formato';

type TablaMarcasProps = {
	marcas: MarcasConCount[];
	nombreMarca: string;
	onChangeNombre: (value: string) => void;
	onAdd: () => void;
	onEdit: (row: MarcasConCount) => void;
	editandoId: number | null;
	onCancelEdit: () => void;
};

export default function TablaMarcas({
	marcas,
	nombreMarca,
	onChangeNombre,
	onAdd,
	onEdit,
	editandoId,
	onCancelEdit,
}: TablaMarcasProps) {
	return (
		<div className="w-full max-w-full overflow-hidden">
			<div className="mb-4 flex flex-wrap items-center gap-2">
				<Input
					value={nombreMarca}
					onChange={(e) => onChangeNombre(e.target.value)}
					placeholder="Nombre de marca"
					className="w-full sm:w-72"
				/>
				<Button onClick={onAdd}>
					{editandoId ? 'Editar' : 'Agregar'}
				</Button>
				{editandoId && (
					<Button variant="outline" onClick={onCancelEdit}>
						Cancelar
					</Button>
				)}
			</div>

			{marcas.length === 0 ? (
				<p className="text-sm text-slate-500">Sin marcas para mostrar</p>
			) : (
				<ScrollArea className="h-96 w-full max-w-full rounded-md border">
					<div className="min-w-max">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>ID</TableHead>
									<TableHead>Nombre</TableHead>
									<TableHead>Total Productos</TableHead>
									<TableHead>Fecha Creacion</TableHead>
									<TableHead>Ultima Actualizacion</TableHead>
									<TableHead>Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{marcas.map((m) => (
									<TableRow key={m.id}>
										<TableCell>{m.id}</TableCell>
										<TableCell>{m.detalle}</TableCell>
										<TableCell>{m.total_productos}</TableCell>
										<TableCell>{formatFecha(m.fecha_creacion)}</TableCell>
										<TableCell>{formatFecha(m.fecha_actualizacion)}</TableCell>
										<TableCell>
											<Button variant="outline" size="sm" onClick={() => onEdit(m)}>
												Editar
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
					<ScrollBar orientation="horizontal" />
					<ScrollBar orientation="vertical" />
				</ScrollArea>
			)}
		</div>
	);
}
