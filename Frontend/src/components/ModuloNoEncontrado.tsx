import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import type { ModuloNoEncontradoProps } from '@/types';

export default function ModuloNoEncontrado({ titulo }: ModuloNoEncontradoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{titulo}</CardTitle>
        <CardDescription>La Pagina no Existe</CardDescription>
      </CardHeader>
    </Card>
  );
}
