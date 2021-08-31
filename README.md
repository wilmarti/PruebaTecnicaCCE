# Prueba Tecnica CCE

## Descripcion del proyecto
```
Se tiene una tienda con N cantidad de productos, los cuales se podrán añadir, eliminar, actualizar
en el carro de compras y en caso de que haya añadido toda la cantidad de un producto, al intentar
añadir de nuevo ese producto deberá indicarle al usuario que no hay disponibilidad de ese producto.
Cada usuario podrá hacer un registro básico (nombre/email/password) para poder realizar la
compra de dichos productos.
```

### Herramientas utilizadas Back End
```
1. Node.js (como entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor basado en el lenguaje de programación JavaScript)
2. Express.js (marco de aplicación web de back-end para Node.js, diseñado para crear aplicaciones web y API)
3. Base de datos Sql Server (como motor de base de datos) Bd NorthWind
```

### Herramientas utilizadas Front End
```
1. Vue.js (como framework de JavaScript de código abierto para la construcción de interfaces de usuario y aplicaciones de una sola página)
```
### Pasos para la instalacion del proyecto
```
Pasos para la instalación de la prueba

Instalación Back End
1.	Crear la base de datos NorthWind 
Descargue los archivos NorthWind.sql y ScriptSql.sql del repositorio, ubicados en la ruta PruebaTecnicaCCE/Tienda/src/Data/ y ejecútelos en el motor de base de datos sql server para poder realizar la creación de la base de datos y el poblamiento de las tablas de datos.
2.	Realice la instalación de Node.js desde el sitio https://nodejs.org/es/
3.	Clone el repositorio desde GitHub con el siguiente comando: git clone https://github.com/wilmarti/PruebaTecnicaCCE.git.
4.	Abra la carpeta denominada Tienda en un editor de codigo como Visual Studio code.
5.	Presione el comando “npm i”, para descargar todas las dependencias del proyecto.
6.	Abra el archivo db.js y modifique los valores de conexión para las siguientes variables según la instalación de su servidor de base de datos Sql Server; user, password, server, database
7.	Para lanzar el Back End digite el comando “npm run dev”

 Instalación  Front End
1.	Realice la instalación de Node.js desde el sitio https://nodejs.org/es/ (si aún no lo ha realizado)
2.	Clone el repositorio desde GitHub con el siguiente comando: git clone https://github.com/wilmarti/PruebaTecnicaCCE.git.
3.	Abra la carpeta denominada FrontEndPrueba en un editor de codigo como Visual Studio code.
4.	Presione el comando “npm i”, para descargar todas las dependencias del proyecto.
5.	Verifique que el API Rest del Back End se encuentre ejecutándose para que pueda atender las solicitudes emitidas por este sitio.
6.	Para lanzar el Front End digite el comando “npm run serve”
7.	Copie la url que el comando anterior le entregue, ejemplo http://localhost:8082/ y péguela en el navegador de su preferencia.
8.	Debe observar algo como se muestra en la siguiente imagen:


Algunas funcionalidades:

1.	Búsqueda de productos por cada letra ingresada filtra automáticamente.
2.	Conteo de la cantidad de productos dentro del carro de compras
3.	Lista de productos en el carro de compras con descripción, cantidad, valor unidad y valor total. 
4.	Botón de sacar del carro, el cual elimina el producto de carro y devuelve las unidades seleccionadas al stock de la tienda. Así:

 
5.	Botón Comprar el cual pide la siguiente informacion para poder hacer la transaccion.

 

La informacion solicitada es necesaria para realizar la compra y es almacenada en la tabla ventas de la base de datos.

 


```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
