import bcrypt from 'bcrypt';
import mongoose, { Document, Schema } from 'mongoose';
import { z } from 'zod';

// Definiera IUser-gränssnittet
export interface IUser extends Document {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    avatar: string;
    isAdmin: boolean;
}

// Skapa Mongoose-schema
const UserSchema = new Schema<IUser>({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }, // Inkludera ej lösenord som standard
    avatar: { type: String, required: false },
    isAdmin: { type: Boolean, default: false }, // Default till `false`
});

// Hasha lösenord före spara
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Zod-schema för validering
export const UserZodSchema = z.object({
    firstname: z.string().min(1, 'Förnamn är obligatoriskt'),
    lastname: z.string().min(1, 'Efternamn är obligatoriskt'),
    username: z.string().min(1, 'Användarnamn är obligatoriskt'),
    password: z.string().min(8, 'Lösenord måste vara minst 8 tecken långt'),
    avatar: z.string().optional(),
    isAdmin: z.boolean().optional(),
});

// Skapa modellen
export const UserModel = mongoose.model<IUser>('User', UserSchema);
