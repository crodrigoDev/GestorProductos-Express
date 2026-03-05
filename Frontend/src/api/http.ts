const API_BASE_URL = 'http://localhost:3000';

export async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, { signal });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: no se pudo obtener ${path}`);
  }

  return (await response.json()) as T;
}
