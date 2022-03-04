var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const cors = require('cors');
var morgan = require("morgan");
var jwt = require('jsonwebtoken');
// const {JWK, JWE} = require('node-jose');


//incriptation
var app = express();
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(morgan("combined"));
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));


//set headers enable
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS");
    next();
  });

//settings
const port = 9000;



//imports routes
const CustomerRoute = require ('./services/Customer/Customer')



//routes or services
app.use(CustomerRoute);


app.listen(port, function () {
  console.log("Service ESB ON: port ", port);
});