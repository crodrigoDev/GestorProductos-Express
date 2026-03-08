import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../ui/alert-dialog';
import type { Estado, Productos } from '@/types';
import { formatFecha } from '@/helpers/formato';
import { varianteEstado, obtenerSiguienteEstado } from '@/helpers/estados';

type TablaProductosProps = {
	productos: Productos[];
	estados: Estado[];
	onCambiarEstado: (producto: Productos, nuevoEstado: Estado) => void;
	onAdd: () => void;
	onEdit: (row: Productos) => void;
	onDelete: (row: Productos) => void;
};

export default function TablaProductos({
	productos,
	estados,
	onCambiarEstado,
	onAdd,
	onEdit,
	onDelete,
}: TablaProductosProps) {
	return (
		<div className="w-full max-w-full overflow-hidden">
			<div className="mb-4">
				<Button onClick={onAdd}>Agregar</Button>
			</div>

			{productos.length === 0 ? (
				<p className="text-sm text-slate-500">Sin productos para mostrar</p>
			) : (
				<ScrollArea className="h-96 w-full max-w-full rounded-md border">
					<div className="min-w-max">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>ID</TableHead>
									<TableHead>Nombre</TableHead>
									<TableHead>Marca</TableHead>
									<TableHead>Categoria</TableHead>
									<TableHead>Descripcion</TableHead>
									<TableHead>Precio</TableHead>
									<TableHead>Stock</TableHead>
									<TableHead>Stock Min</TableHead>
									<TableHead>Stock Max</TableHead>
									<TableHead>Estado</TableHead>
									<TableHead>Fecha Creacion</TableHead>
									<TableHead>Fecha Actualizacion</TableHead>
									<TableHead>Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{productos.map((p) => {
									const siguiente = obtenerSiguienteEstado(estados, p.id_estado);
									return (
										<TableRow key={p.id}>
											<TableCell>{p.id}</TableCell>
											<TableCell>{p.nombre}</TableCell>
											<TableCell>{p.marca}</TableCell>
											<TableCell>{p.categoria}</TableCell>
											<TableCell>{p.descripcion}</TableCell>
											<TableCell>S/ {Number(p.precio).toFixed(2)}</TableCell>
											<TableCell>{p.stock}</TableCell>
											<TableCell>{p.stock_min}</TableCell>
											<TableCell>{p.stock_max}</TableCell>
											<TableCell>
												<Badge
													asChild
													variant={varianteEstado(p.estado)}
													className="cursor-pointer"
												>
													<button
														type="button"
														onClick={() => siguiente && onCambiarEstado(p, siguiente)}
														disabled={!siguiente}
														title="Click para cambiar estado"
													>
														{p.estado}
													</button>
												</Badge>
											</TableCell>
											<TableCell>{formatFecha(p.fecha_creacion)}</TableCell>
											<TableCell>{formatFecha(p.fecha_actualizacion)}</TableCell>
											<TableCell>
												<div className="flex gap-2">
													<Button variant="outline" size="sm" onClick={() => onEdit(p)}>
														Editar
													</Button>
													<AlertDialog>
														<AlertDialogTrigger asChild>
															<Button variant="destructive" size="sm">
																Eliminar
															</Button>
														</AlertDialogTrigger>
														<AlertDialogContent>
															<AlertDialogHeader>
																<AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
																<AlertDialogDescription>
																	Se eliminara <strong>{p.nombre}</strong>. Esta accion no se puede deshacer.
																</AlertDialogDescription>
															</AlertDialogHeader>
															<AlertDialogFooter>
																<AlertDialogCancel>Cancelar</AlertDialogCancel>
																<AlertDialogAction onClick={() => onDelete(p)}>
																	Eliminar
																</AlertDialogAction>
															</AlertDialogFooter>
														</AlertDialogContent>
													</AlertDialog>
												</div>
											</TableCell>
										</TableRow>
									);
								})}
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
