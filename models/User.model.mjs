import mongoose from 'mongoose';
import validator from 'validator';
import argon2  from 'argon2';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username si required']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "invalid email address"]
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
     emailResetToken: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin", "superAdmin"],
        default: 'user'
    },
    password: {
        type: String,
        minlength: [6, "password is too short"]
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetExpires: {
        type: Date
    },
    passwordChangedAt: {
        type: Date
    },
    blocked: {
        type: Boolean,
        default: false
    },

    passwordShots: {
        type: Number,
        default: 0,
        max: 5
    }
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const hash = await argon2.hash(this.password);
         this.password=hash
   }
    next()
})
const User = mongoose.model('users', userSchema);

export default User;