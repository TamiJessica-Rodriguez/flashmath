// import mongoose, { Document, Schema } from 'mongoose';

// export interface IUser extends Document {
//     firstname: string;
//     lastname: string;
//     username: string;
// }

// const userSchema = new Schema<IUser>(
//     {
//         firstname: { type: String, required: true },
//         lastname: { type: String, required: true },
//         username: { type: String, required: true, unique: true },
//     },
//     { collection: 'User' } // Använd exakt samlingsnamn
// );

// export const UserModel = mongoose.model<IUser>('User', userSchema);

import mongoose, { Document, Schema } from 'mongoose';
import { z } from 'zod';

// Mongoose-modellen
export interface IUser extends Document {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
}

const userSchema = new Schema<IUser>(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { collection: 'User' }
);

export const UserModel = mongoose.model<IUser>('User', userSchema);

// Zod-schema
export const UserZodSchema = z.object({
    firstname: z.string().min(1, 'Förnamn är obligatoriskt'),
    lastname: z.string().min(1, 'Efternamn är obligatoriskt'),
    username: z.string().min(3, 'Användarnamn måste vara minst 3 tecken långt'),
    password: z.string().min(6, 'Lösenordet måste vara minst 6 tecken långt'),
});
