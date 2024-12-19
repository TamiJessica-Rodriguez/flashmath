import express from 'express';
import { authenticateToken, isAdmin } from '../middleware';
import { createAdmin, deleteAdmin, getAdminById, getAllAdmins, loginAdmin, updateAdmin } from './admin-handlers';


export const adminRouter = express.Router();

// Routes för admins
adminRouter.get('/', authenticateToken, isAdmin, getAllAdmins); // Hämta alla admins
adminRouter.post('/register', authenticateToken, isAdmin, createAdmin); // Skapa en ny admin (endast admin kan skapa andra admins)
adminRouter.post('/login', loginAdmin); // Logga in som admin
adminRouter.get('/:id', authenticateToken, isAdmin, getAdminById); // Hämta en admin via ID
adminRouter.put('/:id', authenticateToken, isAdmin, updateAdmin); // Uppdatera en admin
adminRouter.delete('/:id', authenticateToken, isAdmin, deleteAdmin); // Ta bort en admin
