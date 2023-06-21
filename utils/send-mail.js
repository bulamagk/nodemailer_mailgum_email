const fs = require("fs/promises");
const path = require("path");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 465,
  secure: true,
  auth: {
    user: "postmaster@sandbox2546b0e8c90644f1b4e02c1b4783e743.mailgun.org",
    pass: "9e36b6587a3ee1fb87af8a6c147dbdb5-135a8d32-717873ff",
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
