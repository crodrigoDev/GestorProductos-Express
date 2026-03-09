import { Router } from 'express';
import {
  obtenerResumenControlador,
  obtenerUltimaActividadControlador,
  obtenerProductosPorCategoriaControlador,
  obtenerProductosPorMarcaControlador,
  obtenerProductosPorEstadoControlador,
  obtenerUltimaCreacionControlador,
} from '../controllers/dashboard.controller';

const dashboardRouter = Router();

dashboardRouter.get('/resumen', obtenerResumenControlador);
dashboardRouter.get('/ultima-actividad', obtenerUltimaActividadControlador);
dashboardRouter.get('/ultima-creacion', obtenerUltimaCreacionControlador);
dashboardRouter.get('/productos-por-categoria', obtenerProductosPorCategoriaControlador);
dashboardRouter.get('/productos-por-marca', obtenerProductosPorMarcaControlador);
dashboardRouter.get('/productos-por-estado', obtenerProductosPorEstadoControlador);

export { dashboardRouter };
