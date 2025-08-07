const nodemailer = require("nodemailer");

const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    host: process.env.HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: process.env.SECURE === 'true',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: subject,
    html: message,
  };

  console.log("Sending email to:", email); // ✅ debug
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
