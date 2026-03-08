import request from 'supertest';
import { app } from '../src/app';
import { catalogFacade } from '../src/facades/catalog.facade';

jest.mock('../src/facades/catalog.facade');

const mock = catalogFacade as jest.Mocked<typeof catalogFacade>;

beforeEach(() => jest.clearAllMocks());

describe('GET /api/estados', () => {
  test('Deberia devolver status 200', async () => {
    mock.listarEstados.mockResolvedValue([]);
    const res = await request(app).get('/api/estados');
    expect(res.statusCode).toBe(200);
  });
});
