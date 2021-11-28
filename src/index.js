const morgan = require("morgan");
const express = require("express");
const validation = require("./utils/validation.utils");
const history = require("./controllers/history.controller");

require("dotenv").config();

//initialization
const app = express();

//settings
app.set("port", process.env.PORT || 4000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middlewars
app.use(morgan(process.env.ENV || "dev"));
const myLogger = async function (req, res, next) {
  if (req.url.toString().startsWith("/resturants")) {
    try {
      const decode = await validation.userLogIn(req);
      history.createHistory(req, decode.id);
      next();
    } catch (e) {
      res.status(401).send({
        message: "Please login",
      });
      return;
    }
  }
};
app.use(myLogger);

//DB
const db = require("./models");
db.sequelize.sync();

//routes
app.use("/user/", require("./routes/user.routes.js"));
app.use("/resturants/", require("./routes/geo.routes.js"));

//start server
app.listen(app.get("port"), () => {
  console.log(`Server on port http://localhost:${app.get("port")}/`);
});
