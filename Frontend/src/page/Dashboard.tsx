import { useEffect, useState } from 'react';
import { Package, Tags, BadgeCheck, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import GraficoBarras from '../components/dashboard/GraficoBarras';
import GraficoPie from '../components/dashboard/GraficoPie';
import { obtenerResumen, obtenerUltimaActividad, obtenerProductosPorCategoria, obtenerProductosPorMarca, obtenerProductosPorEstado } from '../api';
import { formatFecha } from '../helpers/formato';
import type { DashboardResumen, UltimaActividad, ProductosPorCategoria, ProductosPorMarca, ProductosPorEstado } from '../types';

export default function DashboardPage() {
	const [resumen, setResumen] = useState<DashboardResumen | null>(null);
	const [actividad, setActividad] = useState<UltimaActividad[]>([]);
	const [porCategoria, setPorCategoria] = useState<ProductosPorCategoria[]>([]);
	const [porMarca, setPorMarca] = useState<ProductosPorMarca[]>([]);
	const [porEstado, setPorEstado] = useState<ProductosPorEstado[]>([]);

	useEffect(() => {
		Promise.all([
			obtenerResumen(),
			obtenerUltimaActividad(),
			obtenerProductosPorCategoria(),
			obtenerProductosPorMarca(),
			obtenerProductosPorEstado(),
		]).then(([r, a, c, m, e]) => {
			setResumen(r);
			setActividad(a);
			setPorCategoria(c);
			setPorMarca(m);
			setPorEstado(e);
		});
	}, []);

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold">Dashboard</h1>

			<div className="grid gap-4 md:grid-cols-3">
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="text-sm font-medium">Total Productos</CardTitle>
							<Package className="h-4 w-4 text-muted-foreground" />
						</div>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">{resumen?.total_productos ?? 0}</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="text-sm font-medium">Total Marcas</CardTitle>
							<BadgeCheck className="h-4 w-4 text-muted-foreground" />
						</div>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">{resumen?.total_marcas ?? 0}</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle className="text-sm font-medium">Total Categorias</CardTitle>
							<Tags className="h-4 w-4 text-muted-foreground" />
						</div>
					</CardHeader>
					<CardContent>
						<p className="text-3xl font-bold">{resumen?.total_categorias ?? 0}</p>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<Clock className="h-4 w-4 text-muted-foreground" />
						<CardTitle>Ultima actividad</CardTitle>
					</div>
					<CardDescription>Ultimos productos, marcas o categorias actualizados</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Tipo</TableHead>
								<TableHead>Nombre</TableHead>
								<TableHead>Fecha</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{actividad.map((a, i) => (
								<TableRow key={i}>
									<TableCell>
										<Badge variant="outline">{a.tipo}</Badge>
									</TableCell>
									<TableCell>{a.nombre}</TableCell>
									<TableCell>{formatFecha(a.fecha_actualizacion)}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			<div className="grid gap-4 md:grid-cols-2">
				<GraficoBarras porCategoria={porCategoria} porMarca={porMarca} />
				<GraficoPie porEstado={porEstado} />
			</div>
		</div>
	);
}
