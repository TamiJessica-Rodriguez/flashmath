import express from "express";
import {
  createAdmin,
  deleteAdmin,
  getAdmin,
  getAdminById,
  loginAdmin,
  logoutAdmin,
  updateAdmin,
} from "./admin-handlers";

export const adminRouter = express.Router();

adminRouter.get("/", getAdmin);
adminRouter.post("/register", createAdmin);
adminRouter.put("/:id", updateAdmin);
adminRouter.delete("/:id", deleteAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.get("/:id", getAdminById);
adminRouter.post("/logout", logoutAdmin);
