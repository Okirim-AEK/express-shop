import AppError from "../exceptions/AppError.mjs";
import CatchAsync from "../exceptions/CatchAsync.mjs";
import AppResponse from "../responses/AppResponse.mjs"
import validator from "validator";
import User from "../models/User.model.mjs";
import { sendEmail } from "../utils/email.utils.mjs";
import { randomString } from "../utils/generateResetToken.mjs";
import argon2  from 'argon2';
import jwt from 'jsonwebtoken'

export const createUser = CatchAsync(async (req, res, next) => {
    //req.body
    //{email:"",username:"",password:"",passwordConfirm:""}
    const { email, username, password, passwordConfirm } = req.body;
    //check if the password === passwordConfirm
    if (password !== passwordConfirm) {
        return next(new AppError("unmatched password", 400))
    }
    //check if the email is valid
    if (!validator.isEmail(email)) {
        return next(new AppError("invalid email address", 400))
    }
    //check if the email exists
    const emailExists = await User.findOne({ email })

    if (emailExists) {
        return next(new AppError("email address already exists", 400))
    }
    //save user

    //generate random string for email reset token
    const emailResetToken = randomString();

    const user = new User({
        email,
        username,
        password,
        emailResetToken
    })
    await user.save();
    //send email

    const url = validateEmailAddressUrl(req, emailResetToken)
    const emailTemplate = getEmailTemplate(url)
    // we can't wait for email sending
     sendEmail(email, emailTemplate);

    res.status(201).send(AppResponse(201, user))
})

export const validateEmail = CatchAsync(async (req, res, next) => {
    const { emailResetToken } = req.query;
    const user = await User.findOne({ emailResetToken });
    user.emailVerified = true;
    user.emailResetToken = undefined;
    await user.save();
    res.status(200).send({
        message: "email validated",
        user
    })
})

const validateEmailAddressUrl = (req, emailResetToken) => `${req.protocol}://${req.get('host')}/users/email-verification?emailResetToken=${emailResetToken}`;
const getEmailTemplate = (url) => (`<style>h1{color:red;}</style>
         <h1>Express shop</h1>
    <a href='${url}'>validate email</a>`);


export const signIn = CatchAsync(async (req, res, next) => {
    //{email,password}
    const { email, password } = req.body;
    //get use from database with email
    const user = await User.findOne({ email })
   
     if (!user) {
            return next(new AppError("user not found !!", 400));
    }
    if (user.emailVerified == false) {
        return next(new AppError("Unverified email address", 400));
    }
    if (user.blocked) {
        return next(new AppError("blocked account", 400));  
    }
        //check if the user password match the request password
    const checkPassword = await argon2.verify(user.password, password);
      
        if (!checkPassword) {
            if (user.passwordShots < 5) {
                user.passwordShots = user.passwordShots - 1;
            } else {
                user.blocked = true;
            }
            await user.save()
            return next(new AppError("invalid email address or password", 400));
        }
        if (user.passwordShots != 0) {
            user.passwordShots = 0;
            await user.save();
        }
        //create token for the user
        const appSecret = process.env.APP_SECRET;

        const token = jwt.sign({ userId: user._id }, appSecret, {
            expiresIn: '1d'
        })
        res.status(200).send(
            AppResponse(200, token)
        )
})

export const forgotPassword = CatchAsync(async (req, res,next) => {
    const { email } = req.body;

    const user = await User.findOne({email});
    if (!user) {
        return next(new AppError("user not found", 400));
    }
    const generatePasswordResetToken = randomString();
    user.passwordResetToken = generatePasswordResetToken;
    await user.save();
    const url = `${req.protocol}://${req.get('host')}/users/reset-password?resetToken=${generatePasswordResetToken}`;
    const emailTemplate=`<a href='${url}'>reset your password</a>`
  sendEmail(email, emailTemplate);
  
    res.status(200).send({
        message: "email send it",
         url,
        user
    })
})
export const resetPassword = CatchAsync(async (req, res, next) => {
    const { password, passwordConfirm, userId } = req.body;
    const user = await User.findById(userId);
    if (password !== passwordConfirm) {
        return next(new AppError("UnMatched password", 400));
    }
    user.password = password;
    await user.save();

    res.status(200).send({
        message: "password updated successfully",
        user
    });

})