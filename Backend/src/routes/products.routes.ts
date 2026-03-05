import { Router } from 'express';
import { listProducts, ProductFilters } from '../services/products.service';

const productsRouter = Router();

function parseOptionalInt(value: unknown): number | null {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

productsRouter.get('/', async (req, res) => {
  const estado = parseOptionalInt(req.query.estado);
  const marca = parseOptionalInt(req.query.marca);
  const categoria = parseOptionalInt(req.query.categoria);

  const filters: ProductFilters = {
    estado,
    marca,
    categoria,
  };

  try {
    const products = await listProducts(filters);
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: 'No se pudo listar productos',
      detail: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
});

export { productsRouter };
