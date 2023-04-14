import mongoose from "mongoose";

interface IUser {
    username: string;
    password: string;
}

export interface IUserDocument extends IUser, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

export default mongoose.model<IUserDocument>('User', userSchema);