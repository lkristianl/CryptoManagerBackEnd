## Back-end de CryptoManager

Hecho con Node.js, para probar su funcionamiento hay que asegurarse que hay una base de datos MongoDB escuchando en el puerto 12707


## Funcionamiento 

Una vez en el directorio del repositorio, ejecuta el comando:
`node server.js`

Si la base de datos esta configurada correctamente, el output de la consola va a indicar que la conexion se ha establecido y se han creado los roles de tipo User y Admin si la base de datos esta vacia.

### Output esperado de la consola
```
$ node server.js
Server is running on port 4201.
Successfully connect to MongoDB.
added 'admin' to roles collection
added 'user' to roles collection
```

## Componentes de la app

Actualmente, el unico uso del backend es el registro y autenticacion de usuarios.

### Express

Framework muy simple y minimalista de para Node.js, necesario para construir la API Rest

`body-parser` y `cors` son componentes que complementan el funcionamiento de express;
* `body-parser` necesario para procesar el request y crear el objeto `req.body`
* `cors` middleware de express

### JWT (Json Web Token)

Estandar para la creacion de tokens de acceso que permiten la propagacion de identidad.

El flujo de funcionamiento de JWT funciona de esta manera:
1. A partir de la applicacion web el usuario intenta logearse y envia sus datos username y password
2. El servidor recibe los datos y crea un token con el variable secret definido en app/config/auth.config.js cual es enviado a la aplicacion web
3. La aplicacion web envia la peticion autenticada con el Token generado en la cabecera
4. El servidor comprueba la validez del JWT y devuelve la respuesta correspondiente

### MongoDB

Sistema de base de datos NoSQL orientado a documentos. En ningun momento va a ser necesario escribir queries a mano o acceder a la base de datos, gracias al siguiente componente:

### Mongoose

Libreria que gestiona la relaciones entre datos, proporciona validacion de esquemas y se utiliza para traducir los objetos en el codigo a una representacion de esos objetos en MongoDB

Despues de inicializar mongoose, no es necesario crear funciones CRUD (Create, Delete, Update, Delete) porque mongoose tienes soporte para todas las funciones:

* Crear un nuevo user: `object.save()`
* Encontrar user por id: `User.findById(id)`
* Encontrar user por email: `User.findOne({ email: … })`
* Encontrar user por username: `User.findOne({ username: … })`
* Encontrar todos los roles cuyo nombre esta en el array de roles:` Role.find({ name: { $in: roles } })`

