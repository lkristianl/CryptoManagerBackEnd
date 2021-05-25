// Mongoose para gestionar la conexion con la app de Cryptomanager y la base de datos
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");

db.ROLES = ["user", "admin"];

module.exports = db;
