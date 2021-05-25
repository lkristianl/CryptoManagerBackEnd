## Modelos mongoose

Estos modelos mongoose representan las colecciones de `users` y `roles` en MongoDB.

Despues de inicializar mongoose, no es necesario crear funciones CRUD (Create, Delete, Update, Delete) porque mongoose tienes soporte para todas las funciones:

* Crear un nuevo user: `object.save()`
* Encontrar user por id: `User.findById(id)`
* Encontrar user por email: `User.findOne({ email: … })`
* Encontrar user por username: `User.findOne({ username: … })`
* Encontrar todos los roles cuyo nombre esta en el array de roles:` Role.find({ name: { $in: roles } })`
