import express, { Request, Response } from 'express';
import cors from 'cors';
import { productsRouter } from './routes/products.routes';
import { categoriaRouter } from './routes/categoria.routes';
import { marcaRouter } from './routes/marcas.routes';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.json({ ok: true, message: 'Backend Express + TypeScript activo' });
});

app.use('/api/productos', productsRouter);
app.use('/api/categorias', categoriaRouter);
app.use('/api/marcas', marcaRouter);



app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
