import bcrypt from 'bcrypt';
import mongoose, { type InferSchemaType } from 'mongoose';
import { z } from 'zod';

const AdminSchema = new mongoose.Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false },
        isAdmin: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

// Hash lösenordet innan det sparas
AdminSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
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
