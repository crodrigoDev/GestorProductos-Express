import { Package, Tags, BadgeCheck, } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import type { DashboardResumen } from '@/types';

interface props {
    resumen: DashboardResumen | null ;
}

export default function TotalesCard({resumen }: props){
    return(
    <>
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
    </>
    )
}