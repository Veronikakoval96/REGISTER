# API REST - TIENDA
## Descripcion del proyecto

Se ha desarrollado un proyecto de tipo tienda virtual donde interactuan los usuarios y los productos creados ( dos modelos propuestos: usuarios y productos).
Empezamos con la configuiracion de los usuarios, dandolos de alta en la base de datos, donde tendran las caracteristicas mostradas en el MODELO de usuarios y punto a resaltar que conforme se creen los usuarios seran de tipo "user" en el apartado de "role". Asi, nosotros desde MongoAtlas decidiremos a quien darle el rol de "admin" que sera el encargado de modificar los datos del resto de usuarios incluyendo su rol. Los usuarios tipo "users" no podran modificar ni eliminar cuentas ajenas, pero si las suyas, pero no el rol. Si podran tanto users como admins acceder a la informacion del resto de usuarios.
Por otro lado tenemos la creacion de los productos. El proyecto esta configurado de tal manera que solo los usuarios logueados puedan subir los productos, que automaticamente pasan a corresponderles como a creadores.
Los usuarios tendran acceso a los datos de todos los productos y a su vez podran ver a quien corresponde dicho producto. Y viceversa, tendran acceso al resto de usuarios y los productos que les corresponden.
Tambien se ha generado un campo para la subida de imagenes, tanto en users como en productos, que se subiran a la base de datos de Cloudinary y estas seran eliminadas de la base una vez se elimine el usuario y/o el producto.


## Extensiones/Librerias

- Node.js
- Express
- MongoDB
- Mongoose
- Bcrypt
- Dotenv
- Jsonwebtoken
- Cloudinary
- Multer
- Multer-storage-cloudinary
- Nodemon


## Funcionamiento

- INDEX.JS
Aqui empieza todo.
Conectamos Base de DATOS que esta configurada en carpeta CONFIG.
Conectamos Express.
Activamos Dotenv y Cloudinary.
Configuramos rutas principales.
Indicamos puerto y lo escuchamos.

- ROUTES.
En esta carpeta tenemos dos archivos. Uno dedicado a las rutas de los usuarios y otra a los productos. En ambas se especificas las tipicas funciones del CRUD (CREATE, GET, UPDATE Y DELETE) con sus correspondintes rutas e indicando el ID en los casos necesarios. Se aplican en ambos archivos la subida a Cloudinary en rutas y metodos especificos, las funciones establecidas en los CONTROLLERS y si es necesario estar logueado para poder tener acceso a los metodos con la funcion checkAuth importada de la carpeta HELPERS.

- MODELOS.
En esta carpeta encontramos dos archivos, cada uno correspondera a su modelo correspondiente (usuarios, productos). Aqui especificamos la estructura de datos que tendran que tener nuestros modelos y la relacion entre ellos que marcaremos despues con el populate. Importante reflejar que en modelo de USUARIOS se incluye la encriptacion de la contraseña del usuario que posteriormente sera usada en CONTROLLERS conforme se cree el usuario.

- HELPERS.
Aqui podria haberlo organizado mejor porque mezclo Middlewares con funciones, pero a estas alturas me da panico tocar algo mas de aqui. Incluye:

   - Auth.js
     Aqui indicamos tras el login, deberiamos introducir el Token generado en Headers/Authorization para comprobar su validez y asi poder acceder a las rutas protegidas como se especifica en lo archivos de la carpeta ROUTES.
   - File.js
     Aqui se configura la subida y almacenamiento de datos en Cloudinary.
   - Seeds.js
     Aqui creamos una semilla que implantaremos para limpiar nuestra base de datos e introducir los datos que aparecen en el archivo.
   - Token.js
     Generamos las funciones necesarias para la generacion y verificacion del Token.
  

- CONTROLLERS.
En esta carpeta tenemos dos archivos, cada uno correspondera a su modelo (usuarios, productos). Aqui especificaremos los metodos disponibles en cada ruta (que se especifica en rutas). Aqui es donde se desarrollan todos los detalles: quien(role) puede hacer que en cada metodo, las relaciones entre colecciones... En resumen se manejan la creacion, obtencion, modificacion y eliminacion de datos(usuarios,fotos, productos) y las restricciones. Aqui esta el nucleo del proyecto.

- CONFIG.
En esta carpeta nos encontramos con el archivo dbClient.js donde establecemos conexion con la BBDD con Mongoose y obtenemos la contraseña del archivo .ENV.







## .ENV

- PASSWORD =4UZa7lEfXPOfAAOt
- JWT_PASSWORD =veronika1234
- CLOUD_NAME=drygidj78
- CLOUD_SECRET=_bfiDB_QLsMANPrhom8udOmB0LQ
- CLOUD_KEY=456716565721621








