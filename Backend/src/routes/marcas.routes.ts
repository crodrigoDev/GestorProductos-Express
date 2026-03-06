import { Router } from 'express';
import {
  listarMarcasControlador,
  listarMarcasConTotalControlador,
} from '../controllers/marcas.controller';

const marcaRouter = Router();

marcaRouter.get('/', listarMarcasControlador);
marcaRouter.get('/con-count', listarMarcasConTotalControlador);

export { marcaRouter };