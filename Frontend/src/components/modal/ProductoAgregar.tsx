import { type FormEvent, useEffect, useState } from 'react';
import type { Categorias, Estado, Marcas, ProductoNuevo, Productos } from '@/types';
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
	isSubmitting?: boolean;
	productoEditar?: Productos | null;
};

type FormState = {
	nombre: string;
	id_marca: string;
	id_categoria: string;
	descripcion: string;
	precio: string;
	stock: string;
	stock_min: string;
	stock_max: string;
	id_estado: string;
};

const initialFormState: FormState = {
	nombre: '',
	id_marca: '',
	id_categoria: '',
	descripcion: '',
	precio: '',
	stock: '',
	stock_min: '',
	stock_max: '',
	id_estado: '',
};

export default function ProductoAgregar({
	open,
	onOpenChange,
	categorias,
	marcas,
	estados,
	onSubmit,
	isSubmitting = false,
	productoEditar = null,
}: ProductoAgregarProps) {
	const esEdicion = !!productoEditar;
	const [form, setForm] = useState<FormState>(initialFormState);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (open) {
			setError(null);
			if (productoEditar) {
				setForm({
					nombre: productoEditar.nombre,
					id_marca: String(productoEditar.id_marca),
					id_categoria: String(productoEditar.id_categoria),
					descripcion: productoEditar.descripcion,
					precio: String(productoEditar.precio),
					stock: String(productoEditar.stock),
					stock_min: String(productoEditar.stock_min),
					stock_max: String(productoEditar.stock_max),
					id_estado: String(productoEditar.id_estado),
				});
			}
			return;
		}

		setForm(initialFormState);
		setError(null);
	}, [open, productoEditar]);

	function handleInputChange(field: keyof FormState, value: string) {
		setForm((prev) => ({ ...prev, [field]: value }));
	}

	function validate() {
		if (!form.nombre.trim()) return 'El nombre es obligatorio';
		if (!form.id_marca) return 'Debes seleccionar una marca';
		if (!form.id_categoria) return 'Debes seleccionar una categoria';
		if (!form.id_estado) return 'Debes seleccionar un estado';

		if (form.precio === '' || Number.isNaN(Number(form.precio))) return 'Ingresa un precio valido';
		if (form.stock === '' || Number.isNaN(Number(form.stock))) return 'Ingresa un stock valido';
		if (form.stock_min === '' || Number.isNaN(Number(form.stock_min))) {
			return 'Ingresa un stock minimo valido';
		}
		if (form.stock_max === '' || Number.isNaN(Number(form.stock_max))) {
			return 'Ingresa un stock maximo valido';
		}

		const precio = Number(form.precio);
		const stock = Number(form.stock);
		const stockMin = Number(form.stock_min);
		const stockMax = Number(form.stock_max);

		if (precio < 0) return 'El precio no puede ser negativo';
		if (stock < 0 || stockMin < 0 || stockMax < 0) return 'Los valores de stock no pueden ser negativos';
		if (stockMin > stockMax) return 'El stock minimo no puede ser mayor al maximo';

		return null;
	}

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const validationError = validate();
		if (validationError) {
			setError(validationError);
			return;
		}

		const producto: ProductoNuevo = {
			nombre: form.nombre.trim(),
			id_marca: Number(form.id_marca),
			id_categoria: Number(form.id_categoria),
			descripcion: form.descripcion.trim(),
			precio: Number(form.precio),
			stock: Number(form.stock),
			stock_min: Number(form.stock_min),
			stock_max: Number(form.stock_max),
			id_estado: Number(form.id_estado),
		};

		setError(null);
		await onSubmit(producto);
	};

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
				<SheetHeader>
					<SheetTitle>{esEdicion ? 'Editar producto' : 'Agregar producto'}</SheetTitle>
					<SheetDescription>{esEdicion ? 'Modifica los datos del producto.' : 'Completa los datos para registrar un nuevo producto.'}</SheetDescription>
				</SheetHeader>

				<form onSubmit={handleSubmit} className="space-y-4 px-4 pb-6">
					<div className="space-y-2">
						<label htmlFor="nombre" className="text-sm font-medium">
							Nombre
						</label>
						<Input
							id="nombre"
							value={form.nombre}
							onChange={(e) => handleInputChange('nombre', e.target.value)}
							placeholder="Ej. Teclado mecanico"
						/>
					</div>

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div className="space-y-2">
							<label className="text-sm font-medium">Marca</label>
							<Select value={form.id_marca} onValueChange={(value) => handleInputChange('id_marca', value)}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Selecciona marca" />
								</SelectTrigger>
								<SelectContent>
									{marcas.map((marca) => (
										<SelectItem key={marca.id} value={String(marca.id)}>
											{marca.nombre ?? marca.detalle ?? `Marca ${marca.id}`}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<label className="text-sm font-medium">Categoria</label>
							<Select
								value={form.id_categoria}
								onValueChange={(value) => handleInputChange('id_categoria', value)}
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Selecciona categoria" />
								</SelectTrigger>
								<SelectContent>
									{categorias.map((categoria) => (
										<SelectItem key={categoria.id} value={String(categoria.id)}>
											{categoria.nombre ?? categoria.detalle ?? `Categoria ${categoria.id}`}
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
							value={form.descripcion}
							onChange={(e) => handleInputChange('descripcion', e.target.value)}
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
								type="number"
								min="0"
								step="0.01"
								value={form.precio}
								onChange={(e) => handleInputChange('precio', e.target.value)}
								placeholder="0.00"
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="stock" className="text-sm font-medium">
								Stock actual
							</label>
							<Input
								id="stock"
								type="number"
								min="0"
								step="1"
								value={form.stock}
								onChange={(e) => handleInputChange('stock', e.target.value)}
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
								type="number"
								min="0"
								step="1"
								value={form.stock_min}
								onChange={(e) => handleInputChange('stock_min', e.target.value)}
								placeholder="0"
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="stock_max" className="text-sm font-medium">
								Stock maximo
							</label>
							<Input
								id="stock_max"
								type="number"
								min="0"
								step="1"
								value={form.stock_max}
								onChange={(e) => handleInputChange('stock_max', e.target.value)}
								placeholder="0"
							/>
						</div>
					</div>

					<div className="space-y-2">
						<label className="text-sm font-medium">Estado</label>
						<Select value={form.id_estado} onValueChange={(value) => handleInputChange('id_estado', value)}>
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

					{error && <p className="text-sm text-red-600">{error}</p>}

					<SheetFooter className="px-0 pb-0">
						<div className="flex w-full justify-end gap-2">
							<Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
								Cancelar
							</Button>
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting ? 'Guardando...' : esEdicion ? 'Editar producto' : 'Guardar producto'}
							</Button>
						</div>
					</SheetFooter>
				</form>
			</SheetContent>
		</Sheet>
	);
}
