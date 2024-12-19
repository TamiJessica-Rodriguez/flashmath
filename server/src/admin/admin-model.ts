// import bcrypt from 'bcrypt';
// import mongoose, { Schema } from 'mongoose';

// // Mongoose schema för Admin
// const AdminSchema = new Schema(
//     {
//         firstname: { type: String, required: true },
//         lastname: { type: String, required: true },
//         username: { type: String, required: true, unique: true },
//         password: { type: String, required: true, select: false }, // Dölj lösenord som standard
//         isAdmin: { type: Boolean, default: true },
//     },
//     { timestamps: true }
// );

// // Hasha lösenordet innan sparande
// AdminSchema.pre('save', async function (next) {
//     if (this.isModified('password') && !this.password.startsWith('$2b$')) {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// });

// export const AdminModel = mongoose.model('Admin', AdminSchema);

import bcrypt from 'bcrypt';
import mongoose, { Document, Schema } from 'mongoose';

// Definiera en interface för Admin-dokument
interface IAdmin extends Document {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    isAdmin: boolean;
}

// Mongoose schema för Admin
const AdminSchema = new Schema<IAdmin>(
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
AdminSchema.pre<IAdmin>('save', async function (next) {
    if (this.isModified('password') && !this.password.startsWith('$2b$')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Exportera modellen
export const AdminModel = mongoose.model<IAdmin>('Admin', AdminSchema);
