module.exports = (sequelize, Sequelize) => {
  const History = sequelize.define("history", {
    url: {
      type: Sequelize.TEXT,
    },
  });
  return History;
};
