import express, { Request, Response } from 'express';
import cors from 'cors';
import { productosRouter } from './routes/productos.routes';
import { categoriaRouter } from './routes/categoria.routes';
import { marcaRouter } from './routes/marcas.routes';
import { estadosRouter } from './routes/estados.routes';
import { dashboardRouter } from './routes/dashboard.routes';
import { connect, close } from './config/database';

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
app.use('/api/dashboard', dashboardRouter);

if (require.main === module) {
  connect().then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
    });

    process.on('SIGINT', async () => {
      await close();
      server.close(() => process.exit(0));
    });

    process.on('SIGTERM', async () => {
      await close();
      server.close(() => process.exit(0));
    });
  });
}

export { app };
