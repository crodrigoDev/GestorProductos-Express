import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export type ModuloNoEncontradoProps = {
  titulo: string;
};

export default function ModuloNoEncontrado({ titulo }: { titulo: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{titulo}</CardTitle>
        <CardDescription>La Pagina no Existe</CardDescription>
      </CardHeader>
    </Card>
  );
}
