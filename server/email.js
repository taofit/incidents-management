const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
require("dotenv").config();

const options = {
  service: "SendGrid",
  auth: {
    api_key: process.env.SG_API_KEY,
  },
};

const mailer = nodemailer.createTransport(sgTransport(options));

module.exports = mailer;
