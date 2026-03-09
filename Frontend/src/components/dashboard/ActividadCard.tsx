import type { UltimaActividad} from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Clock } from "lucide-react";
import { formatFecha } from "../../helpers/formato";

interface ActividadProps {
    actividad: UltimaActividad[];
}

export default function ActividadCard( {actividad}: ActividadProps){
    return (
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
    )
}