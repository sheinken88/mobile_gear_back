const nodemailer = require("nodemailer");
require("dotenv").config({ path: ".env.development.local" });

let options = {};

try {
  const domain = process.env.EMAIL_USER.split("@")[1];
  const service = domain.split(".")[0].toLowerCase();

  options = {
    service,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  };
} catch {}

const transporter = nodemailer.createTransport(options);

module.exports = transporter;
