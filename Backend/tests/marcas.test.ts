import request from 'supertest';
import { app } from '../src/app';
import { catalogFacade } from '../src/facades/catalog.facade';

jest.mock('../src/facades/catalog.facade');

const mock = catalogFacade as jest.Mocked<typeof catalogFacade>;

beforeEach(() => jest.clearAllMocks());

describe('GET /api/marcas', () => {
  test('Deberia devolver status 200', async () => {
    mock.listarMarcas.mockResolvedValue([]);
    const res = await request(app).get('/api/marcas');
    expect(res.statusCode).toBe(200);
  });
});

describe('GET /api/marcas/:id', () => {
  test('Deberia devolver status 200 si existe', async () => {
    mock.obtenerMarcaPorId.mockResolvedValue({ id: 1, detalle: 'Dell' });
    const res = await request(app).get('/api/marcas/1');
    expect(res.statusCode).toBe(200);
  });

  test('Deberia devolver status 404 si no existe', async () => {
    mock.obtenerMarcaPorId.mockResolvedValue(null);
    const res = await request(app).get('/api/marcas/999');
    expect(res.statusCode).toBe(404);
  });
});

describe('POST /api/marcas', () => {
  test('Deberia devolver status 201 si se crea', async () => {
    mock.crearMarca.mockResolvedValue(undefined);
    const res = await request(app).post('/api/marcas').send({ detalle: 'Lenovo' });
    expect(res.statusCode).toBe(201);
  });
});

describe('PUT /api/marcas/:id', () => {
  test('Deberia devolver status 200 si se actualiza', async () => {
    mock.editarMarca.mockResolvedValue(undefined);
    const res = await request(app).put('/api/marcas/1').send({ detalle: 'Asus' });
    expect(res.statusCode).toBe(200);
  });
});
