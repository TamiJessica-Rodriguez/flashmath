import express from 'express';
import { isAdmin, isLoggedIn } from '../middleware';
import { createAdmin, deleteAdmin, getAdminById, getAllAdmins, loginAdmin, updateAdmin } from './admin-handlers';

export const adminRouter = express.Router();

// Routes för admins
adminRouter.get('/', isLoggedIn, isAdmin, getAllAdmins); // Hämta alla admins
adminRouter.post('/register', createAdmin); // Skapa en ny admin
adminRouter.get('/:id', isLoggedIn, isAdmin, getAdminById); // Hämta en admin via ID
adminRouter.put('/:id', isLoggedIn, isAdmin, updateAdmin); // Uppdatera en admin
adminRouter.delete('/:id', isLoggedIn, isAdmin, deleteAdmin); // Ta bort en admin
adminRouter.post('/login', loginAdmin);
