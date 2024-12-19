import express from 'express';
import { authenticateToken } from '../middleware';
import { createUser, deleteUser, getUsers, loginUser, logoutUser, updateUser } from './user-handlers';

export const userRouter = express.Router();

userRouter.get('/', authenticateToken, getUsers); // Skyddad route
userRouter.post('/create', authenticateToken, createUser); // Skyddad route
userRouter.delete('/:id', authenticateToken, deleteUser); // Skyddad route
userRouter.put('/:id', authenticateToken, updateUser); // Skyddad route
userRouter.post('/login', loginUser); // Öppen route
userRouter.post('/logout', logoutUser); // Kan användas för frontend-logik
