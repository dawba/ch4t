import nodemailer from "nodemailer";

export class EmailService {
  static sendRegistrationMailMessage(email: string, token: string) {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Ch4t app account verification",
      text:
        "Please verify your account to start using ch4t. Click the link below to verify your account: " +
        process.env.CLIENT_URL +
        "/verify/" +
        token,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      } else {
        console.log(`Email sent to user: ${email}. ` + info.response);
      }
    });
  }
}
