const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.SENDEREMAIL ,
    pass: process.env.PASSWORD
  }
});

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (sendTo, message) =>  {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.SENDEREMAIL , // sender address
    to: sendTo , // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: message , // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

module.exports = sendEmail