import request from 'supertest';
import { app } from '../src/app';
import { catalogFacade } from '../src/facades/catalog.facade';

jest.mock('../src/facades/catalog.facade');

const mock = catalogFacade as jest.Mocked<typeof catalogFacade>;

beforeEach(() => jest.clearAllMocks());

const producto = {
  nombre: 'Laptop Dell',
  id_marca: 1,
  id_categoria: 1,
  descripcion: 'Laptop potente',
  precio: 999.99,
  stock: 10,
  stock_min: 2,
  stock_max: 50,
  id_estado: 1,
};

describe('GET /api/productos', () => {
  test('Deberia devolver status 200', async () => {
    mock.listarProductos.mockResolvedValue([]);
    const res = await request(app).get('/api/productos');
    expect(res.statusCode).toBe(200);
  });
});

describe('GET /api/productos/:id', () => {
  test('Deberia devolver status 200 si existe', async () => {
    mock.obtenerProductoPorId.mockResolvedValue(producto);
    const res = await request(app).get('/api/productos/1');
    expect(res.statusCode).toBe(200);
  });

  test('Deberia devolver status 404 si no existe', async () => {
    mock.obtenerProductoPorId.mockResolvedValue(null);
    const res = await request(app).get('/api/productos/999');
    expect(res.statusCode).toBe(404);
  });
});

describe('POST /api/productos', () => {
  test('Deberia devolver status 201 si se crea', async () => {
    mock.crearProducto.mockResolvedValue(undefined);
    const res = await request(app).post('/api/productos').send(producto);
    expect(res.statusCode).toBe(201);
  });
});

describe('PUT /api/productos/:id', () => {
  test('Deberia devolver status 200 si se actualiza', async () => {
    mock.editarProducto.mockResolvedValue(undefined);
    const res = await request(app).put('/api/productos/1').send(producto);
    expect(res.statusCode).toBe(200);
  });
});

describe('DELETE /api/productos/:id', () => {
  test('Deberia devolver status 200 si se elimina', async () => {
    mock.eliminarProducto.mockResolvedValue(undefined);
    const res = await request(app).delete('/api/productos/1');
    expect(res.statusCode).toBe(200);
  });
});

describe('PATCH /api/productos/:id/estado', () => {
  test('Deberia devolver status 200 si se cambia estado', async () => {
    mock.cambiarEstado.mockResolvedValue(undefined);
    const res = await request(app).patch('/api/productos/1/estado').send({ id_estado: 2 });
    expect(res.statusCode).toBe(200);
  });
});
