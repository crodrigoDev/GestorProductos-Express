import request from 'supertest';
import { app } from '../src/app';
import { catalogFacade } from '../src/facades/catalog.facade';

jest.mock('../src/facades/catalog.facade');

const mock = catalogFacade as jest.Mocked<typeof catalogFacade>;

beforeEach(() => jest.clearAllMocks());

describe('GET /api/dashboard/resumen', () => {
  test('Deberia devolver status 200', async () => {
    mock.obtenerResumen.mockResolvedValue({ total_productos: 10, total_marcas: 5, total_categorias: 3 });
    const res = await request(app).get('/api/dashboard/resumen');
    expect(res.statusCode).toBe(200);
  });
});

describe('GET /api/dashboard/ultima-actividad', () => {
  test('Deberia devolver status 200', async () => {
    mock.obtenerUltimaActividad.mockResolvedValue([]);
    const res = await request(app).get('/api/dashboard/ultima-actividad');
    expect(res.statusCode).toBe(200);
  });
});

describe('GET /api/dashboard/productos-por-categoria', () => {
  test('Deberia devolver status 200', async () => {
    mock.obtenerProductosPorCategoria.mockResolvedValue([]);
    const res = await request(app).get('/api/dashboard/productos-por-categoria');
    expect(res.statusCode).toBe(200);
  });
});

describe('GET /api/dashboard/productos-por-marca', () => {
  test('Deberia devolver status 200', async () => {
    mock.obtenerProductosPorMarca.mockResolvedValue([]);
    const res = await request(app).get('/api/dashboard/productos-por-marca');
    expect(res.statusCode).toBe(200);
  });
});

describe('GET /api/dashboard/productos-por-estado', () => {
  test('Deberia devolver status 200', async () => {
    mock.obtenerProductosPorEstado.mockResolvedValue([]);
    const res = await request(app).get('/api/dashboard/productos-por-estado');
    expect(res.statusCode).toBe(200);
  });
});
