import * as mongoose from 'mongoose';
import {IUser} from './IUser';

interface IUserModel extends IUser, mongoose.Document { }

var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    displayName: String
});

export var User = mongoose.model<IUserModel>("User", userSchema);