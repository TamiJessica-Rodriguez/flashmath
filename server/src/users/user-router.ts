import express from 'express';
import { createUser, deleteUser, getUsers } from './user-handlers';

export const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.post('/create', createUser);
userRouter.delete('/:id', deleteUser);
