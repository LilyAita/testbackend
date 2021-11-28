const validation = require("../utils/validation.utils");
const db = require("../models");
const History = db.history;

exports.getHistory = async (req, res) => {
  const logIn = await validation.logIn(req);
  if (!logIn) {
    res.status(401).send({
      message: "Please login",
    });
    return;
  }
  if(req.query.page)
    page = parseInt(req.query.page);
  else
    page = 1
  
  if(req.query.limit)
    limit = parseInt(req.query.limit);
  else
    limit = 2

  
  const decode = await validation.userLogIn(req);
  const userId = decode.id;
  try{
    const response = await History.findAndCountAll({
      where: {
        userId: userId
      },
      offset: page,
      limit: limit
    });
    
    res.send(response);
  }catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while get history.",
    });} 
  
};

exports.createHistory = async (req, userId) => {
  return History.create({ url: req.url.toString(), userId: userId });
};
