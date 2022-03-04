create database ITProfis;
use ITProfis;

create table Tipo_Carga(
	ID int IDENTITY(1,1) PRIMARY KEY,
	Descripcion varchar(25)
);

create table Tipo_Gasto_Adicional(
	ID int IDENTITY(1,1) PRIMARY KEY,
	Descripcion varchar(25)
);

create table Factura(
	ID int not null,
	Fecha date not null,
	Total float not null,
	ID_tipo_gasto_adicional int not null,
	FOREIGN KEY (ID_tipo_gasto_adicional) REFERENCES Tipo_Gasto_Adicional(ID)
);



create table Tipo_Personal(
	ID int IDENTITY(1,1) PRIMARY KEY,
	Descripcion varchar(20)
);

create table Cliente(
	ID int primary key,
	Nombre varchar(100) not null,
	Porcentaje_cargo float not null,
	Direccion_recepcion varchar(150) not null,
	Direccion_entrega varchar(150) not null,
	Lleva_documentacion char(1),
	Departamento_recepcion int not null,
	Departamento_entrega int not null,
	nit varchar(10) not null,
	celular int not null,
	correo varchar(60),
	ID_tipo_carga int not null,
	FOREIGN KEY (ID_tipo_carga) REFERENCES Tipo_Carga(ID),
	FOREIGN KEY (Departamento_recepcion) REFERENCES Departamento(ID),
	FOREIGN KEY (Departamento_entrega) REFERENCES Departamento(ID)
);


create table Equipo_Personal(
	ID int IDENTITY(1,1) PRIMARY KEY,
	Viatico float not null,
	ID_gasto_adicional int not null,
	FOREIGN KEY (ID_gasto_adicional) REFERENCES Tipo_Gasto_Adicional(ID)
);

create table Personal(
	ID int PRIMARY KEY,
	Tiempo_requerido_horas float not null,
	Nombre varchar(75) not null,
	ID_tipo_personal int not null,
	ID_equipo int not null,
	FOREIGN KEY (ID_tipo_personal) REFERENCES Tipo_Personal(ID),
	FOREIGN KEY (ID_equipo) REFERENCES Equipo_Personal(ID)
);

create table Vehiculo(
	ID int PRIMARY KEY,
	Capacidad float not null,
	Combustible_km float not null,
	Distancia_actual_solicitada_km float not null,
	Vehiculo_disponible char(1) not null,
	Depreciacion_km float not null,
	ID_equipo_personal int not null,
	ID_cliente int not null,
	FOREIGN KEY (ID_equipo_personal) REFERENCES Equipo_Personal(ID),
	FOREIGN KEY (ID_cliente) REFERENCES Cliente(ID)
);

create table Departamento(
	ID int IDENTITY(1,1) PRIMARY KEY,
	Nombre varchar (25)
);

-- Agregando datos a DB.

INSERT INTO Departamento(Nombre) VALUES ('Huehuetenango');
INSERT INTO Departamento(Nombre) VALUES ('Zacapa');
INSERT INTO Departamento(Nombre) VALUES ('El Progreso');
INSERT INTO Departamento(Nombre) VALUES ('Guatemala');

INSERT INTO Tipo_Carga(Descripcion) VALUES ('refrigerado');
INSERT INTO Tipo_Carga(Descripcion) VALUES ('mudanza');
INSERT INTO Tipo_Carga(Descripcion) VALUES ('entrega de paquetes');

INSERT INTO Tipo_Gasto_Adicional(Descripcion) VALUES ('peaje');
INSERT INTO Tipo_Gasto_Adicional(Descripcion) VALUES ('aceite');
INSERT INTO Tipo_Gasto_Adicional(Descripcion) VALUES ('gasolina');

INSERT INTO Tipo_Personal(Descripcion) VALUES ('piloto');
INSERT INTO Tipo_Personal(Descripcion) VALUES ('ayudante');

INSERT INTO Cliente 
VALUES (123, 'Juan Alvarado', 63.2, 'Edificio DIGA, usac, zona 12', 'Zona 1, Zacapa', 'y', 1, 2, 'abc', 12345678, 'mail.@gmail.com', 1);
INSERT INTO Cliente 
VALUES (1234, 'PAblo Alvarado', 63.2, 'Zona 2, Zacapa', 'Zona 1, Huehuetenango', 'y', 2, 1, 'abc', 12345678, 'mail2.@gmail.com', 2);


insert into Factura values ( 1, '2022-01-15', 50.5, 1);
insert into Factura values ( 2, '2022-02-15', 89.0, 2);
insert into Factura values ( 3, '2018-01-05', 889.0, 2);


select * from Cliente
            where correo =


-- ==================================================================================================
-- ==================================================================================================
-- SERIE 3

-- ==================================================================================================
	-- Obtener el listado de clientes que han utilizado los servicios de transporte al menos
	-- en una ocasión en los departamentos de El Progreso y Zacapa, pero que no han
	-- transportado productos refrigerados. Los datos que debe visualizar Nit, Nombre y
	-- datos de contacto

		select c.nit, c.nombre, c.celular, c.correo from Cliente c
		inner join Departamento d on c.Departamento_recepcion = d.ID
		inner join Tipo_Carga tc on tc.ID = c.ID_tipo_carga
		where (d.Nombre = 'Zacapa' or  d.Nombre = 'El Progreso') and tc.Descripcion != 'refrigerado';
-- ==================================================================================================

-- ==================================================================================================
	-- Obtener el monto de gastos de los servicios prestados durante el mes de enero de
	-- 2018, el promedio de los servicios facturados durante el mes de enero 2018,
	-- posteriormente especifique el monto de ganancia que obtuvo la empresa
		
		select SUM(f.Total) as Total, avg(f.ID_tipo_gasto_adicional) as 'Promedio Servicio' from Factura f
		where MONTH(f.Fecha) = 1 and YEAR(f.Fecha) = 2018

-- ==================================================================================================