import type { FormEvent } from 'react';
import type { Categorias, Estado, Marcas, ProductoNuevo } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';

type ProductoAgregarProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	categorias: Categorias[];
	marcas: Marcas[];
	estados: Estado[];
	onSubmit: (producto: ProductoNuevo) => Promise<void> | void;
	productoEditar?: ProductoNuevo | null;
};

export default function ProductoAgregar({
	open,
	onOpenChange,
	categorias,
	marcas,
	estados,
	onSubmit,
	productoEditar = null,
}: ProductoAgregarProps) {
	const esEdicion = !!productoEditar;

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const fd = new FormData(event.currentTarget);
		await onSubmit({
			nombre: String(fd.get('nombre')).trim(),
			id_marca: Number(fd.get('id_marca')),
			id_categoria: Number(fd.get('id_categoria')),
			descripcion: String(fd.get('descripcion')).trim(),
			precio: Number(fd.get('precio')),
			stock: Number(fd.get('stock')),
			stock_min: Number(fd.get('stock_min')),
			stock_max: Number(fd.get('stock_max')),
			id_estado: Number(fd.get('id_estado')),
		});
	};

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
				<SheetHeader>
					<SheetTitle>{esEdicion ? 'Editar producto' : 'Agregar producto'}</SheetTitle>
					<SheetDescription>{esEdicion ? 'Modifica los datos del producto.' : 'Completa los datos para registrar un nuevo producto.'}</SheetDescription>
				</SheetHeader>

				<form key={productoEditar ? JSON.stringify(productoEditar) : 'nuevo'} onSubmit={handleSubmit} className="space-y-4 px-4 pb-6">
					<div className="space-y-2">
						<label htmlFor="nombre" className="text-sm font-medium">
							Nombre
						</label>
						<Input
							id="nombre"
							name="nombre"
							defaultValue={productoEditar?.nombre ?? ''}
							placeholder="Ej. Teclado mecanico"
						/>
					</div>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div className="space-y-2">
							<label className="text-sm font-medium">Marca</label>
							<Select name="id_marca" defaultValue={productoEditar ? String(productoEditar.id_marca) : undefined}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Selecciona marca" />
								</SelectTrigger>
								<SelectContent>
									{marcas.map((marca) => (
										<SelectItem key={marca.id} value={String(marca.id)}>
											{marca.detalle}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Categoria</label>
							<Select name="id_categoria" defaultValue={productoEditar ? String(productoEditar.id_categoria) : undefined}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Selecciona categoria" />
								</SelectTrigger>
								<SelectContent>
									{categorias.map((categoria) => (
										<SelectItem key={categoria.id} value={String(categoria.id)}>
											{categoria.detalle}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					<div className="space-y-2">
						<label htmlFor="descripcion" className="text-sm font-medium">
							Descripcion
						</label>
						<Input
							id="descripcion"
							name="descripcion"
							defaultValue={productoEditar?.descripcion ?? ''}
							placeholder="Descripcion breve del producto"
						/>
					</div>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div className="space-y-2">
							<label htmlFor="precio" className="text-sm font-medium">
								Precio
							</label>
							<Input
								id="precio"
								name="precio"
								type="number"
								min="0"
								step="0.01"
								defaultValue={productoEditar?.precio ?? ''}
								placeholder="0.00"
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="stock" className="text-sm font-medium">
								Stock actual
							</label>
							<Input
								id="stock"
								name="stock"
								type="number"
								min="0"
								step="1"
								defaultValue={productoEditar?.stock ?? ''}
								placeholder="0"
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div className="space-y-2">
							<label htmlFor="stock_min" className="text-sm font-medium">
								Stock minimo
							</label>
							<Input
								id="stock_min"
								name="stock_min"
								type="number"
								min="0"
								step="1"
								defaultValue={productoEditar?.stock_min ?? ''}
								placeholder="0"
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="stock_max" className="text-sm font-medium">
								Stock maximo
							</label>
							<Input
								id="stock_max"
								name="stock_max"
								type="number"
								min="0"
								step="1"
								defaultValue={productoEditar?.stock_max ?? ''}
								placeholder="0"
							/>
						</div>
					</div>

					<div className="space-y-2">
						<label className="text-sm font-medium">Estado</label>
						<Select name="id_estado" defaultValue={productoEditar ? String(productoEditar.id_estado) : undefined}>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Selecciona estado" />
							</SelectTrigger>
							<SelectContent>
								{estados.map((estado) => (
									<SelectItem key={estado.id} value={String(estado.id)}>
										{estado.detalle}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<SheetFooter className="px-0 pb-0">
						<div className="flex w-full justify-end gap-2">
							<Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
								Cancelar
							</Button>
							<Button type="submit">
								{esEdicion ? 'Editar producto' : 'Guardar producto'}
							</Button>
						</div>
					</SheetFooter>
				</form>
			</SheetContent>
		</Sheet>
	);
}
