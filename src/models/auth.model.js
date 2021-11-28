
const jwtConfig = require("../config/jwt.config.js");
const jwt = require('jsonwebtoken');

module.exports = (sequelize, Sequelize) => {
  const Auth = sequelize.define(
    "auth",
    {
      token: {
        type: Sequelize.TEXT,
      },
    },
  );
  return Auth;
};
