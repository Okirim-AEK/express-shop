import nodemailer from 'nodemailer';
export const sendEmail = async (sendTo, emailTemplate) => {
    const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ab0293b75f6661",
    pass: "7acf1a4b32bd4a"
  }
    });
     let info = await transporter.sendMail({
    from: '"express shop 👻" <okirimkadiro@gmail.com>', // sender address
    to: sendTo, // list of receivers
    subject: "validate email address", // Subject line
         html:emailTemplate, // html body
  });
}