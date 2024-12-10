import argon2 from "argon2";
import mongoose, { type InferSchemaType } from "mongoose";
import { z } from "zod";

const AdminSchema = new mongoose.Schema({
  firstname: { type: String, required: false },
  lastname: { type: String, required: false },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  isAdmin: { type: Boolean, default: true },
});

AdminSchema.pre("save", async function (next) {
  const admin = this;
  if (admin.isModified("password")) {
    admin.password = await argon2.hash(admin.password);
  }
  next();
});

const AdminZodSchema = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  username: z.string(),
  password: z.string(),
  isAdmin: z.boolean().default(true).optional(),
});
export type Admin = InferSchemaType<typeof AdminSchema>;
export const AdminModel = mongoose.model("Admin", AdminSchema);
export { AdminZodSchema };
