import express from 'express';
import { authenticateToken, isAdmin } from '../middleware';
import { createAdmin, deleteAdmin, getAdminById, getAllAdmins, loginAdmin, updateAdmin } from './admin-handlers';

export const adminRouter = express.Router();

adminRouter.get('/', authenticateToken, isAdmin, getAllAdmins);
adminRouter.post('/register', authenticateToken, isAdmin, createAdmin);
adminRouter.post('/login', loginAdmin);
adminRouter.get('/:id', authenticateToken, isAdmin, getAdminById);
adminRouter.put('/:id', authenticateToken, isAdmin, updateAdmin);
adminRouter.delete('/:id', authenticateToken, isAdmin, deleteAdmin);
