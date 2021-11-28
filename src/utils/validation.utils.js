const jwt = require("./jwt.utils");

exports.validateData = (req, need_fields) => {
  let res = [];
  let myreq = new Map(Object.entries(req));
  for (var field of need_fields) {
    if (!myreq.has(field)) {
      res.push(field);
    }
  }
  return res;
};

exports.logIn = async req => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
    return false;
  }
  token = req.headers.authorization.split(" ")[1];
  return await jwt.validateAccessToken(token);
};

exports.userLogIn = async req => {
  token = req.headers.authorization.split(" ")[1];
  return await jwt.getInformationAccessToken(token);
};
