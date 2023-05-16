const Sequelize = require("sequelize");
const db = require("../db");

class PaymentInfo extends Sequelize.Model {}
PaymentInfo.init(
  {
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
    address: {
      type: Sequelize.TEXT,
    },

    phoneNumber: {
      type: Sequelize.INTEGER,
    },
  },
  {
    sequelize: db,
    modelName: "paymentinfo",
  }
);

module.exports = PaymentInfo;
