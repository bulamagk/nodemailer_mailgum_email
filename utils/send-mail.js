const fs = require("fs/promises");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

const user = process.env.MAILGUM_USER;
const pass = process.env.MAILGUM_PASS;

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 465,
  secure: true,
  auth: {
    user,
    pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function sendMail() {
  try {
    let html = await fs.readFile(path.join(__dirname, "../", "mail.html"), {
      encoding: "utf-8",
    });

    const imageContent = await fs.readFile(
      path.join(__dirname, "../", "assets", "tech.jpg")
    );

    // const to = 'recipientmail@domain.com'
    // const from = 'sendermail@domain.com'

    const mailOptions = {
      from: "no_reply@p-tech.com",
      to: "bulamagk@gmail.com",
      subject: "Testing Nodemailer and Mailgum",
      html,
      attachments: {
        filename: "Car Image.jpg",
        path: path.join(__dirname, "../", "assets", "download.jpg"),
      },
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Mail Sent");
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  sendMail,
};
