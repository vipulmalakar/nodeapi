
import mongoose, { Document, Model, Schema } from "mongoose";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt"

const secretKey = "8Xuu09JDjlNLnSLldY5";

export interface User {
    usename: string,
    password: string,
    phoneNo: string
    email: string,
    token: string[]
}

interface IUserSchema extends User, Document {
    hash: (key: 'usename' | 'password' | 'email') => string;
    createToken: () => string
}


interface IUserModel extends Model<IUserSchema> {
    validateUser(name: string, password: string): string;
    findByUsername(username: string): IUserSchema
}


const UserSchema = new Schema<IUserSchema, IUserModel>({
    usename: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    email: { type: String, unique: true },
    phoneNo: { type: String, },
    token: [String]
})


UserSchema.method('hash', function (key: 'usename' | 'password' | 'email') {
    return bcrypt.hash(this[key], 10);
})

UserSchema.method('createToken', function () {
    return jwt.sign({ id: this._id }, secretKey, { expiresIn: '1d' });
})


UserSchema.static('validateUser', async function (name, password) {
    const user = await this.findOne({ usename: name });
    if (!user) {
        throw new Error("Invalid creds")
    }
    const isVerfied = bcrypt.compareSync(password, user.password);
    if (!isVerfied) {
        throw new Error("Invalid creds")
    }
    const token = user.createToken()
    user.token.push(token);
    await user.save()
    return token
});

UserSchema.static('findByUsername', async function (username) {
    return await this.findOne({ usename: username });
});


UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const hashPassowrd = await this.hash('password')
        this.password = hashPassowrd;
    }
    next()
})

export const UserModel = mongoose.model<Document & IUserSchema, IUserModel>('user', UserSchema)

