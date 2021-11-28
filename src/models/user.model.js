
const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fullname: {
        type: Sequelize.STRING,
      },
    },
    {
      hooks: {
        async beforeCreate(user) {
          // bcrypt create a hash with salt
          user.password = await bcrypt.hash(user.password, 10);
        },
      },
    }
  );
  User.prototype.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  }

  return User;
};
