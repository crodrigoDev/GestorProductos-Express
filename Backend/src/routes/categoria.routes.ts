import { Router } from 'express';
import {
  listarCategoriasControlador,
  listarCategoriasConTotalControlador,
} from '../controllers/categorias.controller';

const categoriaRouter = Router();

categoriaRouter.get('/', listarCategoriasControlador);
categoriaRouter.get('/con-count', listarCategoriasConTotalControlador);

export { categoriaRouter };