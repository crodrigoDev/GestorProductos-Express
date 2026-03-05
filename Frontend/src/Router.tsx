import { createBrowserRouter, Navigate } from 'react-router-dom';
import CategoriasPage from './page/Categorias';
import DashboardPage from './page/Dashboard';
import MarcasPage from './page/Marcas';
import ProductosPage from './page/Productos';
import Layout from './layout/Layout';
import ModuloNoEncontrado from './components/ModuloNoEncontrado';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/productos" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'productos', element: <ProductosPage /> },
      { path: 'categorias', element: <CategoriasPage /> },
      { path: 'marcas', element: <MarcasPage /> },
      { path: '*', element: <ModuloNoEncontrado titulo="No encontrado" /> },
    ],
  },
]);
