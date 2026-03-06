import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import type { CategoriasConCount } from '@/types';

type TablaCategoriasProps = {
	categorias: CategoriasConCount[];
	nombreCategoria: string;
	onChangeNombre: (value: string) => void;
	onAdd: () => void;
	isAdding: boolean;
	onEdit: (row: CategoriasConCount) => void;
};

export default function TablaCategorias({
	categorias,
	nombreCategoria,
	onChangeNombre,
	onAdd,
	isAdding,
	onEdit,
}: TablaCategoriasProps) {
	return (
		<div className="w-full max-w-full overflow-hidden">
			<div className="mb-4 flex flex-wrap items-center gap-2">
				<Input
					value={nombreCategoria}
					onChange={(e) => onChangeNombre(e.target.value)}
					placeholder="Nombre de categoria"
					className="w-full sm:w-72"
				/>
				<Button onClick={onAdd} disabled={isAdding}>
					{isAdding ? 'Guardando...' : 'Agregar'}
				</Button>
			</div>

			{categorias.length === 0 ? (
				<p className="text-sm text-slate-500">Sin categorias para mostrar</p>
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
								{categorias.map((c) => (
									<TableRow key={c.id}>
										<TableCell>{c.id}</TableCell>
										<TableCell>{c.detalle}</TableCell>
										<TableCell>{c.total_productos}</TableCell>
										<TableCell>{new Date(c.fecha_creacion).toLocaleDateString()}</TableCell>
										<TableCell>
											{c.fecha_actualizacion
												? new Date(c.fecha_actualizacion).toLocaleDateString()
												: '-'}
										</TableCell>
										<TableCell>
											<Button variant="outline" size="sm" onClick={() => onEdit(c)}>
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
