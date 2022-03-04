const { Router } = require("express");
const router = Router();
const axios = require("axios").default;

const rest = new (require('rest-mssql-nodejs'))({
    user: 'semi2',
    password: 'semi2',
    server: 'LAPTOP-78OJDO4O',
    database: 'ITProfis',
    port: 1433,
    options: { 
        encrypt: true
    } 
});


//obtener datos de la BD de Carreras para el estudiante
router.post("/login", async (req, res) => {
    const mail = req.body.user

    try{
        const query_login = `select * from Cliente
            where correo = '${mail}'`
        const result_login = await rest.executeQuery( query_login );
        const request_login = result_login.data[0]

        res.status(200).send(request_login)
    }
    catch{
        res.status(204).send('BD time out!')
    }
});

router.get("/Reporte1", async (req, res) => {

    try{
        const query_rep1 = `select c.nit, c.nombre, c.celular, c.correo from Cliente c
            inner join Departamento d on c.Departamento_recepcion = d.ID
            inner join Tipo_Carga tc on tc.ID = c.ID_tipo_carga
            where (d.Nombre = 'Zacapa' or  d.Nombre = 'El Progreso') 
            and tc.Descripcion != 'refrigerado';`
        const result_rep1 = await rest.executeQuery( query_rep1 );
        const request_rep1 = result_rep1.data[0]

        res.status(200).send(request_rep1)
    }
    catch{
        res.status(204).send('BD time out!')
    }
});

router.get("/Reporte2", async (req, res) => {

    try{
        const query_rep1 = `select SUM(f.Total) as Total, avg(f.ID_tipo_gasto_adicional) as 'Promedio Servicio' from Factura f
		where MONTH(f.Fecha) = 1 and YEAR(f.Fecha) = 2018';`
        const result_rep1 = await rest.executeQuery( query_rep1 );
        const request_rep1 = result_rep1.data[0]

        res.status(200).send(request_rep1)
    }
    catch{
        res.status(204).send('BD time out!')
    }
});

module.exports = router;
