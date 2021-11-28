require('dotenv').config();

module.exports = {
    HOST: process.env.HOST || 'localhost',
    USER: process.env.USER || 'root',
    PASSWORD: process.env.PASSWORD || 'Password1',
    DB: process.env.DATABASE ||'db_tyba',
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };