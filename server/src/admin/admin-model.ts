import bcrypt from 'bcrypt';
import mongoose, { Schema, type InferSchemaType } from 'mongoose';
import { z } from 'zod';

// Mongoose schema för Admin
const AdminSchema = new Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false }, // Gör lösenordet dolt som standard
        isAdmin: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

// Hasha lösenordet innan sparande
AdminSchema.pre('save', async function (next) {
    if (this.isModified('password') && !this.password.startsWith('$2b$')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Zod valideringsschema
const AdminZodSchema = z.object({
    firstname: z.string().min(1, 'Firstname is required'),
    lastname: z.string().min(1, 'Lastname is required'),
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type Admin = InferSchemaType<typeof AdminSchema>;
export const AdminModel = mongoose.model('Admin', AdminSchema);
export { AdminZodSchema };
