import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import type { Categorias } from '../../types/categorias';
import type { Marcas } from '../../types/marcas';

type ProductosFiltrosProps = {
  filtroEstado: number | '';
  filtroMarca: number | '';
  filtroCategoria: number | '';
  onChangeEstado: (value: number | '') => void;
  onChangeMarca: (value: number | '') => void;
  onChangeCategoria: (value: number | '') => void;
  onClear: () => void;
  estados: Array<{ id: number; detalle: string }>;
  marcas: Marcas[];
  categorias: Categorias[];
};

export default function ProductosFiltros({
  filtroEstado,
  filtroMarca,
  filtroCategoria,
  onChangeEstado,
  onChangeMarca,
  onChangeCategoria,
  onClear,
  estados,
  marcas,
  categorias,
}: ProductosFiltrosProps) {
  const hasActiveFilters = filtroEstado !== '' || filtroMarca !== '' || filtroCategoria !== '';

  return (
    <div className="mb-4 flex flex-wrap gap-4">
      <Select
        value={filtroEstado === '' ? 'all' : String(filtroEstado)}
        onValueChange={(value) => onChangeEstado(value === 'all' ? '' : Number(value))}
      >
        <SelectTrigger className="w-45">
          <SelectValue placeholder="Todos los estados" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los estados</SelectItem>
          {estados.map((estado) => (
            <SelectItem key={estado.id} value={String(estado.id)}>
              {estado.detalle}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filtroMarca === '' ? 'all' : String(filtroMarca)}
        onValueChange={(value) => onChangeMarca(value === 'all' ? '' : Number(value))}
      >
        <SelectTrigger className="w-45">
          <SelectValue placeholder="Todas las marcas" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las marcas</SelectItem>
          {marcas.map((marca) => (
            <SelectItem key={marca.id} value={String(marca.id)}>
              {marca.detalle ?? marca.nombre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filtroCategoria === '' ? 'all' : String(filtroCategoria)}
        onValueChange={(value) => onChangeCategoria(value === 'all' ? '' : Number(value))}
      >
        <SelectTrigger className="w-45">
          <SelectValue placeholder="Todas las categorias" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las categorias</SelectItem>
          {categorias.map((categoria) => (
            <SelectItem key={categoria.id} value={String(categoria.id)}>
              {categoria.detalle ?? categoria.nombre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={onClear} disabled={!hasActiveFilters}>
        Limpiar filtros
      </Button>
    </div>
  );
}
