const nodemailer = require("nodemailer");
require("dotenv").config();

const domain = process.env.EMAIL_USER.split("@")[1];
const service = domain.split(".")[0].toLowerCase();

const transporter = nodemailer.createTransport({
  service,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = transporter;
