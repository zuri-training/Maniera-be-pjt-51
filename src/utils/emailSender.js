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

exports.sendGridEmail = async () => {};

// transporter.sendMail({
//     to: email,
//     from: "psalmueloye@gmail.com",
//     subject: "Hire Form",
//     html: `<p>Hi ${email},<br>
//     Thank you for your interest in me.<br>
//     I am excited you touched base with me and I can't wait to accomplishing great things with you.<br>
//     Warm Regards,

//     Samuel Osinloye
//     </p>`
// })
