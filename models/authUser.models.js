import mongoose from "mongoose";
import validator from 'validator';


const authUserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true, maxlength: 100},
    fullname: {type: String, required: true, maxlength: 100},
    email: {type: String, required: true, unique: true, validate: (mail) => validator.isEmail(mail)},
    password: {type: String, required: true, minlength: 6}
}, {timestamps: true});

const AuthUserModel = new mongoose.model('AuthUser', authUserSchema);


export default AuthUserModel