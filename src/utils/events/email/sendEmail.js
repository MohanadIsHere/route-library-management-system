import nodemailer from "nodemailer";
import { eventEmitter } from "../eventEmitter.js";
import { EMAIL, PASSWORD } from "../../../config/env.js";

const sendEmail = async ({ from, to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: from || `"Route-Saraha-App" <${EMAIL}>`,
    to: to || "bar@example.com, baz@example.com",
    subject: subject || "Hello ✔",
    text: text || "Hello world?",
    html: html || "<b>Hello world?</b>",
  });

  return info.accepted ? true : false;
};
eventEmitter.on("sendEmail", async ({ from, to, subject, text, html }) => {
  await sendEmail({ from, to, subject, text, html });
});

export default sendEmail;
