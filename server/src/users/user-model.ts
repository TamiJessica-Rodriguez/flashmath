import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    firstname: string;
    lastname: string;
    username: string;
}

const userSchema = new Schema<IUser>(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        username: { type: String, required: true, unique: true },
    },
    { collection: 'User' } // Använd exakt samlingsnamn
);

export const UserModel = mongoose.model<IUser>('User', userSchema);
