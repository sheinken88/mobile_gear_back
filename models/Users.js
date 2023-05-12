const Sequelize = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");

class Users extends Sequelize.Model {}
Users.init(
  {
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    birthDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    dni: {
      type: Sequelize.INTEGER,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [8, 24],
      },
    },
    address: {
      type: Sequelize.TEXT,
    },

    phoneNumber: {
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize: db,
    modelName: "users",
  }
);

Users.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync(8);
  user.salt = salt;

  return user.hash(user.password, user.salt).then((hash) => {
    user.password = hash;
  });
});

Users.prototype.hash = function (plainPassword, salt) {
  return bcrypt.hash(plainPassword, salt);
};

Users.prototype.validatePassword = function (password) {
  return bcrypt
    .hash(password, this.salt)
    .then((hash) => hash === this.password);
};

module.exports = Users;
