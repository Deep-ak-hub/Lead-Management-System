import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const transporter = await nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  let mailOptions = {
    from: "no-reply@example.com",
    to: "vaporuser69@gmail.com",
    subject: options.subject,
    html: options.html,
  };
  await transporter.sendMail(mailOptions);
};

//mail send for forget password

const sendEmailFP = async (options) => {
  const transporter = await nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASSWORD,
    },
  });

  let mailOptions = {
    from: "no-reply@example.com",
    to: options.to,
    subject: options.subject,
    html: options.html,
  };
  await transporter.sendMail(mailOptions);
}

export { sendEmail, sendEmailFP };
