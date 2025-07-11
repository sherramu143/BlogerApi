const express = require("express");

require('dotenv').config();


const bodyParser = require("body-parser");
const app = express();
const db = require("./models");
db.sequelize.sync();


// Apply CORS middleware globally for all routes

// Enable pre-flight (OPTIONS) requests globally for all routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./routes/users.routes")(app);//1
require("./routes/post.routes")(app);
require("./routes/authentication.routes")(app);
// set port, listen for requests
const PORT =3021;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
