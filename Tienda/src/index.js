const express = require('express')
const app = express();
const morgan = require('morgan') 
var bodyParser = require("body-parser"); 


// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});



//configuraciones
app.set('port',process.env.PORT || 3000)
app.set('json spaces',2)

//middelware ==> permite procesar datos antes de que el servidor los reciba
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());


//Rutas
app.use(require('./routes/index'));
app.use('/api/productos',require('./routes/productos'));


//empezando el servidor
app.listen(app.get('port'),()=>{
  console.log(`server on port ${app.get('port')}`);
});

