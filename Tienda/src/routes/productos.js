const {Router} = require('express')
var express = require("express");
const router = Router();
var app = express();
const { poolPromise } = require('./db') 

var bodyParser = require("body-parser");

  /*************************************************************************************************************************/
  /***************************************************** RUTAS *************************************************************/
  /*Archivo que contiene las rutas de conexion a la base de datos necesarias para responder las solicitudes del Front End */

            /**************************** Ruta utilizada para consultar los productos de la tienda *********************/
            router.get('/',async (req, res) => {
              try {  
                  
                  const pool = await poolPromise  
                  const result = await pool.request()   
                  .query("select top 10 ProductID as Id,ProductName,UnitPrice,UnitsInStock from  products" ,function(err, profileset){      
                    
                if (err){  
                    res.send("Error")  
                    console.log("Error de conexion");
                    console.log(err);
                  }  
                else {  
                    var send_data = profileset.recordset;  
                    res.json(profileset.recordset);  
                    console.log(send_data);
                    }  
                })  
                } catch (err) {  
                    res.status(500)  
                    res.send(err.message)  
                }  
            }),

            /**************************** Ruta utilizada para consultar los productos del carro *********************/
            router.get('/ListaCarro',async (req, res) => {
              try {  
                  
                  const pool = await poolPromise  
                  const result = await pool.request()   
                  .query("select IdProducto id,ProductName,SUM(cantidad) cantidad ,UnitPrice ValorUnidad, SUM(cantidad) * UnitPrice as ValorTotal from ProductosCarro a inner join Products b on a.IdProducto = b.ProductID GROUP BY IdProducto,ProductName,UnitPrice" ,function(err, profileset){      
                    
                if (err){  
                    res.send("Error")  
                    console.log("Error de conexion");
                    console.log(err);
                  }  
                else {  
                    var send_data = profileset.recordset;  
                    res.json(profileset.recordset);  
                    console.log(send_data);
                    }  
                })  
                } catch (err) {  
                    res.status(500)  
                    res.send(err.message)  
                }  
            }),


            /**************************** Ruta utilizada para insertar usuarios *********************/
            router.post('/', async (req, res) => {  
              try {  

                const newUsuario = {...req.body};
                var sql = `Insert into usuarios (NombreUsuario,Email,Contraseña) VALUES ('${newUsuario.username}','${newUsuario.email}','${newUsuario.password}')`;

                const pool = await poolPromise  
                const result = await pool.request()  
                .query(sql,function(err, profileset){ 
                  
                      if (err){  
                        console.log("error err",err)
                          res.send("error") 
                      }  
                      else {      
                        console.log("ok bien")             
                          res.json(newUsuario);  
                      }
              })  
              } catch (err) {  
                  res.status(500)  
                  res.send(err.message)  
                  console.log("catch",err) 

              }  
              })  ; 


              /**************************** Ruta utilizada para consultar el LOGIN *********************/
              router.post('/Login', async (req, res) => {  
                try {  

              const newUsuario = {...req.body};
              console.log("newUsuario.username",newUsuario.identifier)
              console.log("newUsuario.password",newUsuario.password)
              var sql = `select count(*) from usuarios where Email = '${newUsuario.email}' and Contraseña = '${newUsuario.password}')`;

              const pool = await poolPromise  
              const result = await pool.request()  
              .query(sql,function(err, profileset){ 
                
                    if (err){  
                      console.log("error err",err)
                        res.send("error") 
                    }  
                    else {      
                      console.log("ok bien")             
                        res.json(newUsuario);  
                    }
            })  
            } catch (err) {  
                res.status(500)  
                res.send(err.message)  
                console.log("catch",err) 

            }  
            })  ; 

           /**************************** Ruta utilizada para actualizar stock  *********************/
           router.put('/:id', async (req, res) => {  
            try {  
    
              let id = parseInt(req.params.id);
              const newCurso = {...req.body};
              console.log("newCurso", newCurso)

              console.log("newCurso.UnitsInStock.Operacion",newCurso.UnitsInStock.Operacion)

              if(newCurso.UnitsInStock.Operacion == "Restar"){
                console.log("entro por restar")
                  var sql = `UPDATE Products SET UnitsInStock = UnitsInStock - '${newCurso.UnitsInStock.Cantidad}'  WHERE ProductID ='${id}' `;
                }else{
                  
                  var sql = `UPDATE Products SET UnitsInStock = UnitsInStock + '${newCurso.UnitsInStock.Cantidad}'  WHERE ProductID ='${id}' `;
                  console.log("entro por sumar",sql)
                }
              const pool = await poolPromise  
              const result = await pool.request()  
              .query(sql,function(err, profileset){ 
                 
                    if (err){  
                        console.log(err)
                        res.send(err) 
                    }  
                    else {                   
                        res.json({ok:'Producto Actualizado'});  
                    }   
            })  
            } catch (err) {  
                res.status(500)  
                res.send(err.message)  
                console.log(err) 
            }  
            }); 

      /**************************** Ruta utilizada para insertar elementos al carro *********************/
      router.post('/carro', async (req, res) => {  
        try {  

          const newProductoCarro = {...req.body};
          var sql = `Insert into ProductosCarro (IdProducto,IdUsuario,Cantidad) VALUES ('${newProductoCarro.IdProducto}','${newProductoCarro.IdUsuario}','${newProductoCarro.Cantidad}')`;

          const pool = await poolPromise  
          const result = await pool.request()  
          .query(sql,function(err, profileset){ 
            
                if (err){  
                  console.log("error err",err)
                    res.send("error") 
                }  
                else {      
                  console.log("ok bien")             
                    res.json(newProductoCarro);  
                }
        })  
        } catch (err) {  
            res.status(500)  
            res.send(err.message)  
            console.log("catch",err) 

        }  
        })  ; 


     /**************************** Ruta utilizada para insertar compras por cliente *********************/
     router.post('/CompraCliente', async (req, res) => {  
      try {  

        const newCompraCliente = {...req.body};
        var sql = `Insert into Ventas (NombreComprador,EmailComprador,PasswordComprador,IdProducto,Cantidad,ValorUnidad,ValorTotal) VALUES ('${newCompraCliente.NombreCliente}','${newCompraCliente.EmailCliente}','${newCompraCliente.PasswordCliente}','${newCompraCliente.idproduct}','${newCompraCliente.Cantidad}','${newCompraCliente.VUnidad}','${newCompraCliente.VTotal}')`;

        const pool = await poolPromise  
        const result = await pool.request()  
        .query(sql,function(err, profileset){ 
          
              if (err){  
                console.log("error err",err)
                  res.send("error") 
              }  
              else {      
                console.log("ok bien")             
                  res.json(newCompraCliente);  
              }
      })  
      } catch (err) {  
          res.status(500)  
          res.send(err.message)  
          console.log("catch",err) 

      }  
      })  ; 
      
      

    /**************************** Ruta utilizada para eliminar productos del carro *********************/
    router.delete('/:id', async (req, res) => {  
      try {  

          let id = parseInt(req.params.id);
          console.log(id)
        var sql = `DELETE FROM ProductosCarro WHERE IdProducto ='${id}' `;

        const pool = await poolPromise  
        const result = await pool.request()  
        .query(sql,function(err, profileset){ 
           
              if (err){  
                  console.log(err)
                  res.send(err) 
              }  
              else {                   
                  res.json({ok:'Producto eliminado'});  
              }
      })  
      } catch (err) {  
          res.status(500)  
          res.send(err.message)  
      }  
      }); 












    







  /**************************** Ruta utilizada para consultar los cursos de la tabla TBL_RCURSO_VIRTUAL *********************/
  router.get('/', async (req, res) => { 
    console.log("Entro al metodo"); 
    try {  
        
        const pool = await poolPromise  
        const result = await pool.request()  
      //.query("select Id_Curso value,NombreCurso text, case when estado= 1 then 'ACTIVO' ELSE 'INACTIVO' END AS ESTADO,NumeroHoras from [dbo].[TBL_RCURSO_VIRTUAL] order by Id_Curso " ,function(err, profileset){  
        .query("select ProductID,ProductName,QuantityPerUnit,UnitPrice,UnitsInStock,UnitsOnOrder from  products" ,function(err, profileset){      
          
      if (err){  
          res.send("Error")  
          console.log("Error de conexion");
          console.log(err);
        }  
      else {  
          var send_data = profileset.recordset;  
          res.json(profileset.recordset);  
          console.log(send_data);
          }  
      })  
      } catch (err) {  
          res.status(500)  
          res.send(err.message)  
      }  
    });


      /**************************** Ruta utilizada para consultar un curso especifico de la tabla TBL_RCURSO_VIRTUAL *********************/
    router.get('/:index', async (req, res) => {  
        try {  

        let id = parseInt(req.params.index);

        var sql = `select Id_Curso,NombreCurso,estado from [dbo].[TBL_RCURSO_VIRTUAL] WHERE ID_CURSO ='${id}' `;
        const pool = await poolPromise
        const result = await pool.request()          
        .query(sql ,function(err, profileset){ 
             
        
        if (err){              
            res.send("Error")  
            console.log(err) 
          }  
        else {  
            var send_data = profileset.recordset;  
            res.json(send_data); 
            console.log(send_data) 
            }  
        })  
        } catch (err) {  
            res.status(500)  
            res.send(err.message) 
            console.log(err) 
        }  
        }); 


    




 
  


module.exports = router;
