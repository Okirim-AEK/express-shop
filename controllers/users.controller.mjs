import AppError from "../exceptions/AppError.mjs";
import CatchAsync from "../exceptions/CatchAsync.mjs";
import AppResponse from "../responses/AppResponse.mjs"
import validator from "validator";
import User from "../models/User.model.mjs";
import nodemailer from 'nodemailer';
export const createUser = CatchAsync(async(req, res, next) => {
    //req.body
    //{email:"",username:"",password:"",passwordConfirm:""}
    const { email, username, password, passwordConfirm } = req.body;
  console.log(email)
  console.log(username)
  console.log(password)
  console.log(passwordConfirm)
     //check if the password === passwordConfirm
    if (password !== passwordConfirm) {
        return next(new AppError("unmatched password",400))
    }
    //check if the email is valid
    if (!validator.isEmail(email)) {
       return next(new AppError("invalid email address",400))
   }
    //check if the email exists
    const emailExists =await  User.findOne({ email })

    if (emailExists) {
        return  next(new AppError("email address already exists",400))
    }
    //save user
    const emailResetToken = 'dsfdsfdsfaasdfsdacbcbksbk';
    const user = new User({
        email,
        username,
        password,
        emailResetToken
    })
    await user.save();
    //send email
  
    const url = `${req.protocol}://${req.get('host')}/users/email-verification?emailResetToken=${emailResetToken}`
    await sendEmail(email, url);

      res.status(201).send(AppResponse(201,user))
})

export const validateEmail = CatchAsync(async (req, res, next) => {
    const { emailResetToken } = req.query;
    const user =  await User.findOne({ emailResetToken });
    user.emailVerified = true;
    await user.save();
    res.status(200).send({
        message: "email validated",
       user 
     })
})
const sendEmail = async (sendTo,url) => {
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
         html: `<style>h1{color:red;}</style>
         <h1>Express shop</h1>
    <a href='${url}'>validate email</a>`, // html body
  });
}