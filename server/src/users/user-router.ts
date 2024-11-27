import express from 'express';
import { createUser, deleteUser, getUsers, updateUser } from './user-handlers';

export const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.post('/create', createUser);
userRouter.delete('/:id', deleteUser);
userRouter.put('/:id', updateUser);
