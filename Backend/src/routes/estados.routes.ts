import { Router } from 'express';
import { listarEstadosControlador } from '../controllers/estados.controller';

const estadosRouter = Router();

estadosRouter.get('/', listarEstadosControlador);

export { estadosRouter };
