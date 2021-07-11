const nodemailer = require("nodemailer");

require("dotenv").config();

const { SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD } = process.env;

exports.sendEmail = async (option) => {
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: option.from,
    to: option.to,
    subject: option.subject,
    html: option.html,
  };
  await transporter.sendMail(mailOptions);
};
