import { Router } from 'express';
import { listarMarcas } from '../services/marcas.service';

const marcaRouter = Router();

marcaRouter.get('/', async (req, res) => {
  try {
    const marcas = await listarMarcas();
    res.json(marcas);
  } catch (error) {
    res.status(500).json({
      message: 'No se pudo listar las marcas',
      detail: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
});

export { marcaRouter };