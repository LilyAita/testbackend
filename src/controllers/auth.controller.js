const jwt = require("../utils/jwt.utils");
const validation = require("../utils/validation.utils");
const db = require("../models");
const User = db.user;
const Auth = db.auth;

const isUniqueUser = async username => {
  return User.findOne({ where: { username: username } });
};

exports.signup = async (req, res) => {
  // Validate request
  const empty_fields = validation.validateData(req.body, ["username", "password", "fullname", "repassword"]);
  if (empty_fields.length !== 0) {
    res.status(400).send({
      message: `${empty_fields.join(", ")} can not be empty`,
    });
    return;
  }

  if (req.body.password !== req.body.repassword) {
    res.status(400).send({
      message: "the password and repassword are not the same",
    });
    return;
  }
  let user = await isUniqueUser(req.body.username);
  if (user) {
    res.status(400).send({
      message: `The username ${req.body.username} already exist.`,
    });
    return;
  }

  // Save User in the database
  try {
    user = await User.create(req.body);
    res.status(204).send();
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User.",
    });
    return;
  }
};

exports.login = async (req, res) => {
  const empty_fields = validation.validateData(req.body, ["username", "password"]);

  if (empty_fields.length !== 0) {
    res.status(400).send({
      message: `${empty_fields.join(", ")} can not be empty`,
    });
    return;
  }
  const user = await User.findOne({ where: { username: req.body.username } });

  if (!user) {
    res.status(400).send({
      message: `${req.body.username} is not exist`,
    });
    return;
  }

  const validate = await user.comparePassword(req.body.password);

  if (validate) {
    try {
      res.status(200).send({
        refreshToken: await jwt.generateRefreshToken(user.dataValues),
        accessToken: jwt.generateAccessToken(user.dataValues),
      });
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Create RefreshToken.",
      });
    }
  } else
    res.status(400).send({
      message: "the password is not correct",
    });
};

exports.logout = async (req, res) => {
  const empty_fields = validation.validateData(req.body, ["refreshToken"]);

  if (empty_fields.length !== 0) {
    res.status(400).send({
      message: `${empty_fields.join(", ")} can not be empty`,
    });
    return;
  }
  Auth.destroy({ where: { token: req.body.refreshToken } })
    .then(num => {
      if (num == 1) {
        res.status(204).send();
      } else {
        res.send({
          message: `Cannot delete Token. Maybe Token was not found!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while delete the RefreshToken.",
      });
    });
};

exports.refreshToken = async (req, res) => {
  const empty_fields = validation.validateData(req.body, ["refreshToken"]);

  if (empty_fields.length !== 0) {
    res.status(400).send({
      message: `${empty_fields.join(", ")} can not be empty`,
    });
    return;
  }
  Auth.findOne({ where: { token: req.body.refreshToken } })
    .then(auth => {
      if (auth) {
        const user = User.findByPk(auth.dataValues.userId);
        res.send({ accessToken: jwt.generateAccessToken(user) });
      } else {
        res.status(400).send({
          message: "Token was not found!",
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while refresh the RefreshToken.",
      });
    });
};
