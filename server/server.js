const express = require("express");
const cors = require("cors");
const app = express();
const dummies = require("./dummies/index");
var bcrypt = require("bcryptjs");

const db = require("./models");
const User = db.user;

db.sequelize.sync(
  {
    force: true
  }
).then(() => {
  console.log('Drop and Resync Db');
  dummies.createClients()
})


var corsOptions = {
  origin: "http://localhost:8080"
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
require('./routes/event.routes')(app);
require('./routes/order.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});