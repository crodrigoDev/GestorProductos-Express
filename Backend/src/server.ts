import express, { Request, Response } from 'express';
import cors from 'cors';
import { productosRouter } from './routes/productos.routes';
import { categoriaRouter } from './routes/categoria.routes';
import { marcaRouter } from './routes/marcas.routes';
import { estadosRouter } from './routes/estados.routes';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.json({ ok: true, message: 'Backend Express + TypeScript activo' });
});

app.use('/api/productos', productosRouter);
app.use('/api/categorias', categoriaRouter);
app.use('/api/marcas', marcaRouter);
app.use('/api/estados', estadosRouter);



app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
