import { useEffect, useState } from 'react';
import GraficoBarras from '../components/dashboard/GraficoBarras';
import GraficoPie from '../components/dashboard/GraficoPie';
import ActividadCard from '../components/dashboard/ActividadCard';
import CreacionCard from '../components/dashboard/CreacionCard';
import TotalesCard from '../components/dashboard/TotalesCard';
import { obtenerResumen, obtenerUltimaActividad, obtenerUltimaCreacion,obtenerProductosPorCategoria, obtenerProductosPorMarca, obtenerProductosPorEstado } from '../api';
import type { DashboardResumen, UltimaActividad, UltimaCreacion, ProductosPorCategoria, ProductosPorMarca, ProductosPorEstado } from '../types';

export default function DashboardPage() {
	const [resumen, setResumen] = useState<DashboardResumen | null>(null);
	const [actividad, setActividad] = useState<UltimaActividad[]>([]);
	const [creacion, setCreacion] = useState<UltimaCreacion[]>([]);
	const [porCategoria, setPorCategoria] = useState<ProductosPorCategoria[]>([]);
	const [porMarca, setPorMarca] = useState<ProductosPorMarca[]>([]);
	const [porEstado, setPorEstado] = useState<ProductosPorEstado[]>([]);

	useEffect(() => {
		Promise.all([
			obtenerResumen(),
			obtenerUltimaActividad(),
			obtenerUltimaCreacion(),
			obtenerProductosPorCategoria(),
			obtenerProductosPorMarca(),
			obtenerProductosPorEstado(),
		]).then(([r, a, cr, c, m, e]) => {
			setResumen(r);
			setActividad(a);
			setCreacion(cr);
			setPorCategoria(c);
			setPorMarca(m);
			setPorEstado(e);
		});
	}, []);

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold">Dashboard</h1>

			<div className="grid gap-4 md:grid-cols-3">
				<TotalesCard
					resumen={resumen}
				/>
			</div>

			<div className='grid gap-4 md:grid-cols-2'>
				<ActividadCard
					actividad={actividad}
				/>
				<CreacionCard 
					creacion={creacion}
				/>
			</div>
			
			<div className="grid gap-4 md:grid-cols-2">
				<GraficoBarras porCategoria={porCategoria} porMarca={porMarca} />
				<GraficoPie porEstado={porEstado} />
			</div>
		</div>
	);
}
