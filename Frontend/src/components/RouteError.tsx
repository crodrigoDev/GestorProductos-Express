import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

export default function RouteError() {
  const error = useRouteError();

  let title = 'Ocurrio un error inesperado';
  let description = 'Intenta recargar la pagina.';

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;
    description = typeof error.data === 'string' ? error.data : description;
  } else if (error instanceof Error) {
    description = error.message;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
