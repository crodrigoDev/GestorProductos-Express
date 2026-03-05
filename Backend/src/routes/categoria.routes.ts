import { Router } from 'express';
import { listarCategoria } from '../services/categoria.service';

const categoriaRouter = Router();

categoriaRouter.get('/', async (req, res) => {
  try {
    const categorias = await listarCategoria();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({
      message: 'No se pudo listar categorias',
      detail: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
});

export { categoriaRouter };