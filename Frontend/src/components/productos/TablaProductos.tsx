import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import type { Estado, Productos } from '@/types';

function formatFecha(fecha: string | null): string {
	if (!fecha) return '-';
	return new Date(fecha).toLocaleString();
}

function varianteEstado(nombreEstado: string): 'default' | 'secondary' | 'destructive' | 'outline' {
	const estado = nombreEstado.toLowerCase();
	if (estado === 'activo') return 'default';
	if (estado === 'inactivo') return 'secondary';
	if (estado === 'descontinuado') return 'destructive';
	return 'outline';
}

function obtenerSiguienteEstado(estados: Estado[], idEstadoActual: number): Estado | null {
	if (estados.length === 0) return null;
	const indice = estados.findIndex((e) => e.id === idEstadoActual);
	if (indice === -1) return estados[0];
	return estados[(indice + 1) % estados.length];
}

type TablaProductosProps = {
	productos: Productos[];
	estados: Estado[];
	idProductoCambiando: number | null;
	onCambiarEstado: (producto: Productos, nuevoEstado: Estado) => void;
	onAdd: () => void;
	onEdit: (row: Productos) => void;
	onDelete: (row: Productos) => void;
};

export default function TablaProductos({
	productos,
	estados,
	idProductoCambiando,
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
														disabled={!siguiente || idProductoCambiando === p.id}
														title="Click para cambiar estado"
													>
														{idProductoCambiando === p.id ? 'Cambiando...' : p.estado}
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
													<Button variant="destructive" size="sm" onClick={() => onDelete(p)}>
														Eliminar
													</Button>
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
