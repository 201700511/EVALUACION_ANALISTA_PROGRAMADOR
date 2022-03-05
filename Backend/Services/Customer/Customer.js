const { Router } = require("express");
const router = Router();
const axios = require("axios").default;
var jwt = require('jsonwebtoken');
const { token } = require("morgan");

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
    const pass = req.body.pass

    try{
        const query_login = `select * from Cliente
            where correo = '${mail}' and password = '${pass}'`
        const result_login = await rest.executeQuery( query_login );
        const request_login = result_login.data[0]

        var token = 'fail'
        if(request_login.length > 0)
            token = jwt.sign({request_login}, 'itprofis')
        res.status(200).send(token)
    }
    catch{
        res.status(204).send('BD time out!')
    }
});

// Obtener nombre el estudiante, verificar token
router.get("/GetNameUser", async(req, res) =>{
    try{
        var token_without_bearer = bearer_token(req.headers.authorization)
        const token = jwt.verify(token_without_bearer, 'itprofis')
        const ID = token.request_login[0].ID
        try{
            const query_name = `select Nombre, nit, celular, correo from Cliente
                where ID = ${ID}`
            const result_name = await rest.executeQuery( query_name );
            const request_name = result_name.data[0][0]
            
            res.status(200).send(request_name)
        }
        catch{
            res.status(504).send('BD time out!')
        }
    }
    catch{
        res.status(401).send('Authorization required!')
    }
})

router.get("/Reporte1", async (req, res) => {
    try{
        var token_without_bearer = bearer_token(req.headers.authorization)
        const token = jwt.verify(token_without_bearer, 'itprofis')

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
    }
    catch{
        res.status(401).send('Authorization required!')
    }
});

router.get("/Reporte2", async (req, res) => {
    try{
        var token_without_bearer = bearer_token(req.headers.authorization)
        const token = jwt.verify(token_without_bearer, 'itprofis')

        try{
            const query_rep1 = `select SUM(f.Total) as Total, avg(f.ID_tipo_gasto_adicional) as 'Promedio_Servicio' from Factura f
            where MONTH(f.Fecha) = 1 and YEAR(f.Fecha) = 2018;`
            const result_rep1 = await rest.executeQuery( query_rep1 );
            const request_rep1 = result_rep1.data[0]

            res.status(200).send(request_rep1)
        }
        catch{
            res.status(204).send('BD time out!')
        }
    }
    catch{
        res.status(401).send('Authorization required!')
    }
});

router.post("/UpdatePerfil", async (req, res) => {
    const celular = req.body.celular
    try{
        var token_without_bearer = bearer_token(req.headers.authorization)
        const token = jwt.verify(token_without_bearer, 'itprofis')
        const ID = token.request_login[0].ID

        try{
            if(celular > 0){
                const query_rep1 = `UPDATE Cliente SET celular = ${celular}
                WHERE ID = ${ID} `
                const result_rep1 = await rest.executeQuery( query_rep1 );
                const request_rep1 = result_rep1.data[0]
                res.status(200).send(request_rep1)
            }
            else 
                res.status(200).send({'msg': 'celular sin valor.'})
        }
        catch{
            res.status(204).send('BD time out!')
        }
    }
    catch{
        res.status(401).send('Authorization required!')
    }
});


function bearer_token(bearer){
    if(!bearer.toLocaleLowerCase().startsWith("bearer ")){
        return 0
    }
    var token = bearer.replace('bearer', '').trim()
    return token
}

module.exports = router;
