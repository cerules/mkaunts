import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import * as config from 'config';

import {IUser} from './../../shared/models/IUser';

interface IUserModel extends IUser, mongoose.Document { 
    hash : String,
    salt : String,
    
    setPassword(password: string) : void,
    validPassword(password: string): boolean,
    generateJWT() : string,
    clientView() : IUser
}

function toLower(v) {
    return v.toLowerCase();
}

let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function emailValidator(email: String) {
    return (email && email !== "" && email.match(emailRegex));
}

let userSchema = new mongoose.Schema({
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
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');

    return this.hash === hash;
};

userSchema.methods.generateJWT = function () {
    let today = new Date(), exp = new Date(today);
    exp.setDate(exp.getDate() + 1);

    return jwt.sign(<any>{
        _id: this._id,
        sub: this.email,
        exp: exp.getTime() / 1000 // exp is in milliseconds and we want seconds
    }, <string>config.get('jwtSecret'));
};

userSchema.methods.clientView = function(): IUser {
    return {
        _id: this._id,
        email: this.email,
        displayName: this.displayName
    };
}

export let User = mongoose.model<IUserModel>("User", userSchema);