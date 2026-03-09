Drop Database Tech_Solutions;
CREATE DATABASE IF NOT EXISTS Tech_Solutions;
USE Tech_Solutions;

CREATE TABLE Categoria(
	id int primary key auto_increment,
    detalle char(30) unique not null,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Marca(
	id int primary key auto_increment,
    detalle char(30) unique not null,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME NULL ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Estado(
	id int primary key auto_increment,
    detalle char(30) unique not null
);

CREATE TABLE Producto(
	id int primary key auto_increment,
    nombre char(50) not null,
    id_marca int references Marca(id),
    id_categoria int references Categoria(id),
    descripcion char(200) not null,
    precio decimal(10, 2) not null,
    stock int not null,
    stock_min int not null,
    stock_max int not null,
    id_estado int references Estado(id),
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME NULL ON UPDATE CURRENT_TIMESTAMP
);

insert into Marca (detalle) values ("Samsung"),("LG"),("Sony"),("Iphone"),("JBL"),("Xiaomi"),("Canon"),("Asus"),("Gigabyte"),("Steelseries"),("MSI");
insert into Categoria (detalle) values ("Televisores"),("Celulares"),("Tablets"),("Camaras"),("Parlantes"),("Monitores"),("Auriculares y Audifonos"),("Laptops");
insert into Estado (detalle) values ("Activo"),("Inactivo"),("Descontinuado"),("Agotado");

INSERT Producto (id, nombre, id_marca, id_categoria, descripcion, precio, stock, stock_min, stock_max, id_estado)values 
	-- Televisores
	(null, "Smart TV 55'' 4K", 1 , 1 , "Televisor UHD con HDR y apps integradas", 1800.00, 30, 5, 50, 1),
    (null, "Samsung Crystal UHD 55", 1, 1, "Televisor 55 pulgadas 4K UHD Smart TV", 1899.99, 15, 5, 30, 1),
	(null, "LED 32'' HD", 2, 1, "Televisor compacto ideal para dormitorios", 750.00, 25, 5, 40, 1),
    (null, "LG OLED C3 65", 2, 1, "Televisor OLED 65 pulgadas 4K", 3999.99, 8, 2, 15, 1),
    
	-- Celulares
	(null, "Galaxy S23", 1, 2,  "Smartphone con camara triple y 256GB", 3500.00, 10, 5, 20, 1),
	(null, "iPhone 14", 4, 2, "Pantalla OLED y chip A15 Bionic", 4200.00, 8, 5, 30, 1),
	(null, "iPhone 15 Pro", 4, 2, "Celular 256GB color titanio", 4599.90, 20, 5, 40, 1),
	(null, "Xiaomi Redmi Note 13", 6, 2, "Celular 128GB pantalla AMOLED", 899.90, 35, 10, 60, 1),

	-- Tablets
	(null, "Samsung Galaxy Tab S9", 1, 3, "Tablet 11 pulgadas 128GB", 2499.90, 10, 3, 25, 1),
	
    -- Camaras
	(null, "Canon EOS R50", 7, 4, "Camara mirrorless 24MP 4K", 3299.00, 6, 2, 12, 1),
	
    -- Parlantes
	(null, "JBL Flip 6", 5, 5, "Parlante bluetooth resistente al agua", 499.90, 25, 8, 50, 1),
	
    -- Monitores
	(null, "Asus TUF Gaming VG27", 8, 6, "Monitor 27 pulgadas 165Hz", 1299.00, 18, 5, 35, 1),
	(null, "Gigabyte G27Q", 9, 6, "Monitor 27 pulgadas QHD 144Hz", 1199.00, 14, 4, 30, 1),
    
    -- Auriculares y Audifonos
	(null, "Sony WH-1000XM5", 3, 7, "Auriculares con cancelacion de ruido", 1499.00, 12, 4, 25, 1),
	(null, "Steelseries Arctis 7", 10, 7, "Audifonos gaming inalambricos", 799.00, 0, 3, 20, 4),
    
    -- Laptops
	(null, "MSI Katana GF66", 11, 8, "Laptop gamer Intel i7 RTX 3060", 5899.00, 5, 2, 10, 4);

-- Vistas

create view vwProductos as 
	select 
		p.id,
        p.nombre,
        p.id_marca,
        p.id_categoria,
        m.detalle as marca,
        c.detalle as categoria,
        p.descripcion,
        p.precio,
        p.stock,
        p.stock_min,
        p.stock_max,
        p.id_estado,
        e.detalle as estado,
        p.fecha_creacion,
        p.fecha_actualizacion
	from Producto p 
    inner join Marca m 
		on m.id = p.id_marca
	inner join Categoria c
		on c.id = p.id_categoria
	inner join Estado e
		on e.id = p.id_estado;
        
create view vwProductoid as
	select
		id,
		nombre,
        id_marca,
        id_categoria,
        descripcion,
        precio,
        stock,
        stock_min,
        stock_max,
        id_estado
	from Producto;

-- Procedimientos almacenados

-- Categoria
create procedure sp_crearCategoria(in p_detalle char(30))
	insert Categoria (detalle) values (p_detalle);
    
create procedure sp_editarCategoria(
	in p_id int,
    in p_detalle char(30)
)
	update Categoria set detalle = p_detalle where id = p_id;
    
create procedure sp_listarCategoriaContar()
	select
		c.id,
		c.detalle,
		COUNT(p.id) as total_productos,
		c.fecha_creacion,
		c.fecha_actualizacion
	from Categoria c
	left join Producto p on p.id_categoria = c.id
	group by c.id, c.detalle, c.fecha_creacion, c.fecha_actualizacion;

create procedure sp_listarCategoria()
	select
		*
	from Categoria;
    
create procedure sp_listarCategoriaId(in p_id int)
	select
		id, detalle
	from Categoria
    where id = p_id;

-- Marca
create procedure sp_crearMarca(in p_detalle char(30))
	insert Marca (detalle) values (p_detalle);
    
create procedure sp_editarMarca (
	in p_id int,
    in p_detalle char(30)
)
	update Marca set detalle = p_detalle where id = p_id;
    
create procedure sp_listarMarcasContar()
	select
		m.id,
		m.detalle,
		COUNT(p.id) as total_productos,
		m.fecha_creacion,
		m.fecha_actualizacion
	from Marca m
	left join Producto p on p.id_marca = m.id
	group by m.id, m.detalle, m.fecha_creacion, m.fecha_actualizacion;

create procedure sp_listarMarcas()
	select * from Marca;
    
create procedure sp_listarMarcaId(in p_id int)
	select id,detalle from Marca where id = p_id;

-- Estado
create procedure sp_listarEstados()
	select * from Estado;
    
-- Producto
create procedure sp_listarProductosFiltro(
	in p_estado int,
    in p_marca int,
    in p_categoria int
)
	select
		*
	from vwProductos
    where (id_estado = p_estado or p_estado is null)
		and (id_marca = p_marca or p_marca is null)
        and (id_categoria = p_categoria or p_categoria is null);
        
create procedure sp_crearProducto(
	in p_nombre char(50),
    in p_marca int,
    in p_categoria int,
    in P_descripcion char(200),
    in p_precio decimal(10,2),
    in p_stock int,
    in p_stock_min int,
    in p_stock_max int,
    in p_estado int
)
	insert Producto (nombre, id_marca, id_categoria, descripcion, precio, stock, stock_min, stock_max, id_estado) values
		(p_nombre, p_marca, p_categoria, p_descripcion, p_precio, p_stock, p_stock_min, p_stock_max, p_estado);
        
create procedure sp_editarProducto(
	in p_id int,
	in p_nombre char(50),
    in p_marca int,
    in p_categoria int,
    in P_descripcion char(200),
    in p_precio decimal(10,2),
    in p_stock int,
    in p_stock_min int,
    in p_stock_max int,
    in p_estado int
)
	update 
		Producto 
	set
		nombre = p_nombre,
        id_marca = p_marca,
        id_categoria = p_categoria,
        descripcion = p_descripcion,
        precio = p_precio,
        stock = p_stock,
        stock_min = p_stock_min,
        stock_max = p_stock_max,
        id_estado = p_estado
	where
		id = p_id;

create procedure sp_cambiarEstado(
	in p_id int,
    in p_estado int
)
	update
		Producto
	set
		id_estado = p_estado
	where
		id = p_id;
	
create procedure sp_listarProductoId(
	in p_id int
)
	select
		*
	from vwProductoid
    where id = p_id;
    
create procedure sp_eliminarProducto(
	in p_id int
)
	delete from producto where id = p_id;

-- Dashboard
create procedure sp_dashboardResumen()
	select
		(select count(*) from Producto) as total_productos,
		(select count(*) from Marca) as total_marcas,
		(select count(*) from Categoria) as total_categorias;

create procedure sp_dashboardUltimaActividad()
	select tipo, nombre, fecha_actualizacion from (
		select 'Producto' as tipo, nombre, fecha_actualizacion from Producto where fecha_actualizacion is not null
		union all
		select 'Marca' as tipo, detalle as nombre, fecha_actualizacion from Marca where fecha_actualizacion is not null
		union all
		select 'Categoria' as tipo, detalle as nombre, fecha_actualizacion from Categoria where fecha_actualizacion is not null
	) as actividad
	order by fecha_actualizacion desc
	limit 5;

create procedure sp_dashboardUltimaCreacion()
	select tipo, nombre, fecha_creacion from(
		select 'Producto' as tipo, nombre, fecha_creacion from Producto union all
		select 'Marca' as tipo, detalle, fecha_creacion from Marca union all
		select 'Categoria' as tipo, detalle, fecha_creacion from Categoria
	) as fecha_creacion
	order by fecha_creacion desc limit 5;

create procedure sp_dashboardProductosPorCategoria()
	select
		c.detalle as categoria,
		count(p.id) as total_productos
	from Categoria c
	left join Producto p on p.id_categoria = c.id
	group by c.id, c.detalle
	order by total_productos desc;

create procedure sp_dashboardProductosPorMarca()
	select
		m.detalle as marca,
		count(p.id) as total_productos
	from Marca m
	left join Producto p on p.id_marca = m.id
	group by m.id, m.detalle
	order by total_productos desc;

create procedure sp_dashboardProductosPorEstado()
	select
		e.detalle as estado,
		count(p.id) as total_productos
	from Estado e
	left join Producto p on p.id_estado = e.id
	group by e.id, e.detalle
	order by total_productos desc;