import type { UltimaCreacion } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Clock } from "lucide-react";
import { formatFecha } from "../../helpers/formato";

interface props {
    creacion: UltimaCreacion[];
}

export default function CreacionCard({creacion}: props){
    return(
    <Card>
        <CardHeader>
            <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <CardTitle>Ultima Creacion</CardTitle>
            </div>
            <CardDescription>Ultimos productos, marcas o categorias creados</CardDescription>
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
                    {creacion.map((cr, i) => (
                        <TableRow key={i}>
                            <TableCell>
                                <Badge variant="outline">{cr.tipo}</Badge>
                            </TableCell>
                            <TableCell>{cr.nombre}</TableCell>
                            <TableCell>{formatFecha(cr.fecha_creacion)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
    )
}