import { Router } from 'express';
import {
  listarMarcasControlador,
  listarMarcasConTotalControlador,
  crearMarcaControlador,
} from '../controllers/marcas.controller';

const marcaRouter = Router();

marcaRouter.get('/', listarMarcasControlador);
marcaRouter.get('/con-count', listarMarcasConTotalControlador);
marcaRouter.post('/', crearMarcaControlador);

export { marcaRouter };