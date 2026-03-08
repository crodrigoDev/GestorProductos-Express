import request from 'supertest';
import { app } from '../src/app';
import { catalogFacade } from '../src/facades/catalog.facade';

jest.mock('../src/facades/catalog.facade');

const mock = catalogFacade as jest.Mocked<typeof catalogFacade>;

beforeEach(() => jest.clearAllMocks());

describe('GET /api/categorias', () => {
  test('Deberia devolver status 200', async () => {
    mock.listarCategorias.mockResolvedValue([]);
    const res = await request(app).get('/api/categorias');
    expect(res.statusCode).toBe(200);
  });
});

describe('GET /api/categorias/:id', () => {
  test('Deberia devolver status 200 si existe', async () => {
    mock.obtenerCategoriaPorId.mockResolvedValue({ id: 1, detalle: 'Laptops' });
    const res = await request(app).get('/api/categorias/1');
    expect(res.statusCode).toBe(200);
  });

  test('Deberia devolver status 404 si no existe', async () => {
    mock.obtenerCategoriaPorId.mockResolvedValue(null);
    const res = await request(app).get('/api/categorias/999');
    expect(res.statusCode).toBe(404);
  });
});

describe('POST /api/categorias', () => {
  test('Deberia devolver status 201 si se crea', async () => {
    mock.crearCategoria.mockResolvedValue(undefined);
    const res = await request(app).post('/api/categorias').send({ detalle: 'Teclados' });
    expect(res.statusCode).toBe(201);
  });
});

describe('PUT /api/categorias/:id', () => {
  test('Deberia devolver status 200 si se actualiza', async () => {
    mock.editarCategoria.mockResolvedValue(undefined);
    const res = await request(app).put('/api/categorias/1').send({ detalle: 'Notebooks' });
    expect(res.statusCode).toBe(200);
  });
});
