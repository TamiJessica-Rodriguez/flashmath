import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';

// Mongoose schema för Admin
const AdminSchema = new Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true, select: false }, // Dölj lösenord som standard
        isAdmin: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// Hasha lösenordet innan sparande
AdminSchema.pre('save', async function (next) {
    if (this.isModified('password') && !this.password.startsWith('$2b$')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

export const AdminModel = mongoose.model('Admin', AdminSchema);
