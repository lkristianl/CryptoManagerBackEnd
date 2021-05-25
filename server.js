// Express para construir las API Rest
const express = require("express");
// bodyParser necesario para parsear el request y crear el objeto req.body
const bodyParser = require("body-parser");
// express middleware
const cors = require("cors");

const dbConfig = require("./app/config/db.config.js");

// Crear app express,despues añadir body-parser y cors con app.use()
const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};


app.use(cors(corsOptions));
// parsear requests de tipo - application/json
app.use(bodyParser.json());
// parsear requests de tipo - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Declaracion y conexion con MongoDB
const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// definir ruta simple get
app.get("/", (req, res) => {
  res.json({ message: "Welcome to kris application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 4201;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// Crear roles usuario y admin
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
