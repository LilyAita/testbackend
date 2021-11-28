const morgan = require("morgan");
const express = require("express");
require("dotenv").config();

//initialization
const app = express();

//settings
app.set("port", process.env.PORT || 4000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middlewars
app.use(morgan(process.env.ENV || "dev"));

//DB
const db = require("./models");
db.sequelize .sync();

//routes
app.use( "/user/", require("./routes/user.js"));


//start server
app.listen(app.get("port"), () => {
  console.log(`Server on port http://localhost:${app.get("port")}/`);
});
