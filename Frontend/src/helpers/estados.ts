import type { Estado } from '@/types';

export function varianteEstado(nombreEstado: string): 'default' | 'secondary' | 'destructive' | 'outline' {
	const estado = nombreEstado.toLowerCase();
	if (estado === 'activo') return 'default';
	if (estado === 'inactivo') return 'secondary';
	if (estado === 'descontinuado') return 'destructive';
	return 'outline';
}

export function obtenerSiguienteEstado(estados: Estado[], idEstadoActual: number): Estado | null {
	if (estados.length === 0) return null;
	const indice = estados.findIndex((e) => e.id === idEstadoActual);
	if (indice === -1) return estados[0];
	return estados[(indice + 1) % estados.length];
}
