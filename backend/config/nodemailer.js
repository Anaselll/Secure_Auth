import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user:"consoleone111111111@gmail.com",
    pass: "rrgc ftsh vpqb mjfr",
  },
});

export default transporter;
