import express from 'express';
import { getUsers } from './user-handlers';

export const userRouter = express.Router();

// Endpoint för att hämta alla användare
userRouter.get('/', getUsers);
