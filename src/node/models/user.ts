import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import * as config from 'config';

import {IUser} from './IUser';

interface IUserModel extends IUser, mongoose.Document { }

function toLower(v) {
    return v.toLowerCase();
}

let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function emailValidator(email: String) {
    return (email && email !== "" && email.match(emailRegex));
}

var userSchema = new mongoose.Schema({
    email : {type : String, set: toLower, validate: emailValidator, index: {unique: true}, required: true},
    hash : String,
    salt : String,
    displayName: String
});

userSchema.methods.setPassword = function (password: string) : void {
    this.salt = crypto.randomBytes(16).toString('hex');

    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function (password: string): boolean {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');

    return this.hash === hash;
};

userSchema.methods.generateJWT = function () {
    var today = new Date(), exp = new Date(today);
    exp.setMinutes(exp.getMinutes() + 15);

    return jwt.sign({
        _id: this._id,
        sub: this.email,
        exp: exp.getTime() / 1000 // exp is in milliseconds and we want seconds
    }, <string>config.get('jwtSecret'));
};

export var User = mongoose.model<IUserModel>("User", userSchema);