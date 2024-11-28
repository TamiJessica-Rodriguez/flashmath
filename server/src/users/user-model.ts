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

import bcrypt from 'bcrypt';
import mongoose, { Document, Schema } from 'mongoose';
import { z } from 'zod';

// Mongoose-modellen
export interface IUser extends Document {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false }, // Prevent password from being returned in queries by default
    },
    { collection: 'User' }
);

// Pre-save middleware for password hashing
userSchema.pre('save', async function (next) {
    const user = this as IUser;
    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
    next();
});

// Metod: Verifiera lösenord
userSchema.methods.comparePassword = async function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Export User model
export const UserModel = mongoose.model<IUser>('User', userSchema);

// Zod-schema för validering
export const UserZodSchema = z.object({
    firstname: z.string().min(1, 'Förnamn är obligatoriskt'),
    lastname: z.string().min(1, 'Efternamn är obligatoriskt'),
    username: z.string().min(3, 'Användarnamn måste vara minst 3 tecken långt'),
    password: z.string().min(6, 'Lösenordet måste vara minst 6 tecken långt'),
});
