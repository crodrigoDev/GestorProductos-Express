import { Router } from 'express';
import {
  listarMarcasControlador,
  listarMarcasConTotalControlador,
  crearMarcaControlador,
  editarMarcaControlador,
  obtenerMarcaPorIdControlador,
} from '../controllers/marcas.controller';

const marcaRouter = Router();

marcaRouter.get('/', listarMarcasControlador);
marcaRouter.get('/con-count', listarMarcasConTotalControlador);
marcaRouter.get('/:id', obtenerMarcaPorIdControlador);
marcaRouter.post('/', crearMarcaControlador);
marcaRouter.put('/:id', editarMarcaControlador);

export { marcaRouter };