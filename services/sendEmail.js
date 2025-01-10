const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  var transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // email which sent email 
      pass: process.env.EMAIL_PASS // apppassword of sending email s
    },
  });

  const mailOptions = {
    from: "YOGENDRA BASKOTA <haha@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail