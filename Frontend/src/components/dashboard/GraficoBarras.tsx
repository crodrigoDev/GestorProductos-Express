import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '../ui/chart';
import type { ProductosPorCategoria, ProductosPorMarca } from '../../types';

const COLORES_BARRAS = [
  '#6366f1', '#f43f5e', '#10b981', '#f59e0b', '#3b82f6',
  '#8b5cf6', '#ec4899', '#14b8a6', '#ef4444', '#06b6d4',
];

interface Props {
  porCategoria: ProductosPorCategoria[];
  porMarca: ProductosPorMarca[];
}

export default function GraficoBarras({ porCategoria, porMarca }: Props) {
  const [vista, setVista] = useState<'categoria' | 'marca'>('categoria');

  const datos = vista === 'categoria'
    ? porCategoria.map((c, i) => ({ nombre: c.categoria, total: c.total_productos, fill: COLORES_BARRAS[i % COLORES_BARRAS.length] }))
    : porMarca.map((m, i) => ({ nombre: m.marca, total: m.total_productos, fill: COLORES_BARRAS[i % COLORES_BARRAS.length] }));

  const config: ChartConfig = {
    total: { label: 'Productos', color: '#6366f1' },
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>
              Productos por {vista === 'categoria' ? 'Categoria' : 'Marca'}
            </CardTitle>
            <CardDescription>
              Cantidad de productos en cada {vista === 'categoria' ? 'categoria' : 'marca'}
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setVista(vista === 'categoria' ? 'marca' : 'categoria')}
          >
            Ver por {vista === 'categoria' ? 'Marca' : 'Categoria'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="min-h-75 w-full">
          <BarChart data={datos} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="nombre"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              angle={-35}
              textAnchor="end"
              height={70}
              interval={0}
              tickFormatter={(value: string) => value.length > 14 ? value.slice(0, 12) + '...' : value}
            />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="total" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
