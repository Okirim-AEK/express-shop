import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

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
    authTries: {
        type: Number,
        default: 0,
        max: 5
    }
});

userSchema.pre('save', function (next) {
 
    bcrypt.hash(this.password, 10,(err, hash) =>{
        this.password = hash;
});
    next()
})
const User = mongoose.model('users', userSchema);

export default User;