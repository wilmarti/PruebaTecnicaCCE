// DB.js config for your database  
const sql = require('mssql')
/* var ConnectionPool = require('tedious-connection-pool');
var Request = require('tedious').Request; */

 
 const config = {
    user: 'sa',
    password: 'Kiara',
    server: "localhost" , 
    database: 'Northwind',
    "options": {
    "encrypt": true,
    "enableArithAbort": true
    }
}   


 const poolPromise = new sql.ConnectionPool(config)  
.connect()  
.then(pool => {  
console.log('Connected to MSSQL') 
return pool  
})  
.catch(err => console.log('Database Connection Failed! Bad Config: ', err))  
module.exports = {  
sql, poolPromise  
}   






