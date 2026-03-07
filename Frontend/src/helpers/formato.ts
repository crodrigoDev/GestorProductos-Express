export function formatFecha(fecha: string | null): string {
	if (!fecha) return '-';
	return new Date(fecha).toLocaleString();
}
