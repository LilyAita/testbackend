module.exports = (sequelize, Sequelize) => {
  const Auth = sequelize.define("auth", {
    token: {
      type: Sequelize.TEXT,
    },
  });
  return Auth;
};
