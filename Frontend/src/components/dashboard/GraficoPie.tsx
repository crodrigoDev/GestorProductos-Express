import { useMemo } from 'react';
import { Pie, PieChart, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from '../ui/chart';
import type { ProductosPorEstado } from '../../types';

const COLORES_PIE = [
  '#6366f1', '#f43f5e', '#10b981', '#f59e0b', '#3b82f6',
  '#8b5cf6', '#ec4899', '#14b8a6', '#ef4444', '#06b6d4',
];

interface Props {
  porEstado: ProductosPorEstado[];
}

export default function GraficoPie({ porEstado }: Props) {
  const datos = porEstado.map((e, i) => ({
    nombre: e.estado,
    total: e.total_productos,
    fill: COLORES_PIE[i % COLORES_PIE.length],
  }));

  const config = useMemo<ChartConfig>(() => {
    const cfg: ChartConfig = {};
    porEstado.forEach((e, i) => {
      cfg[e.estado] = { label: e.estado, color: COLORES_PIE[i % COLORES_PIE.length] };
    });
    return cfg;
  }, [porEstado]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribucion por Estado</CardTitle>
        <CardDescription>Proporcion de productos en cada estado</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="mx-auto aspect-square max-h-75">
          <PieChart accessibilityLayer>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={datos} dataKey="total" nameKey="nombre" innerRadius={50}>
              {datos.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="nombre" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
