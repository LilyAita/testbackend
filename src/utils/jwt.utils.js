const jwtConfig = require("../config/jwt.config.js");
const jwt = require("jsonwebtoken");
const db = require("../models");
const Auth = db.auth;

exports.generateRefreshToken = async user => {
  let token = jwt.sign({ id: user.id, username: user.username }, jwtConfig.PRIVATEKEYREFRESHTOKEN, {
    expiresIn: "365d",
  });
  await Auth.create({ token: token, userId: user.id });
  return token;
};

exports.validateAccessToken = async token => {
  try {
    await jwt.verify(token, jwtConfig.PRIVATEKEYTOKEN);
    return true;
  } catch (e) {
    return false;
  }
};
exports.getInformationAccessToken = async token => {
  return await jwt.verify(token, jwtConfig.PRIVATEKEYTOKEN);
};

exports.generateAccessToken = user => {
  return jwt.sign({ id: user.id, username: user.username }, jwtConfig.PRIVATEKEYTOKEN, { expiresIn: "20min" });
};
