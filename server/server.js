const express = require("express");
const cors = require("cors");
const app = express();
var bcrypt = require("bcryptjs");

const db = require("./models");
const User = db.user;

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

async function initial() {
  // Users

  const admin = await User.create({
    username: "admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("12345678", 8)
  }).then(user => {
    return user
  })

  // Clients
  const kevin = await User.create({
    username: "kevin",
    email: "kevin@gmail.com",
    password: bcrypt.hashSync("12345678", 8)
  })
    .then(user => {
      return user
    })
  // /Clients

  // /Users
}

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to kevposesp application." });
// });

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/client.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});