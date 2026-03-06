import { Router } from 'express';
import {
  listarMarcasControlador,
  listarMarcasConTotalControlador,
  crearMarcaControlador,
  editarMarcaControlador,
} from '../controllers/marcas.controller';

const marcaRouter = Router();

marcaRouter.get('/', listarMarcasControlador);
marcaRouter.get('/con-count', listarMarcasConTotalControlador);
marcaRouter.post('/', crearMarcaControlador);
marcaRouter.put('/:id', editarMarcaControlador);

export { marcaRouter };