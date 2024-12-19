import express from 'express';
import { getImage, uploadImage } from '../images/images-handlers';
import { authenticateToken, isAdmin } from '../middleware';
import { createPosts, deletePost, getPosts, updatePost } from './post-handlers';

export const postsRouter = express.Router();

// Skydda alla routes med autentisering
postsRouter.get('/', authenticateToken, getPosts); // Endast inloggade användare
postsRouter.post('/', authenticateToken, createPosts); // Endast inloggade användare kan skapa poster
postsRouter.put('/:id', authenticateToken, updatePost); // Endast inloggade användare kan uppdatera poster
postsRouter.delete('/:id', authenticateToken, isAdmin, deletePost); // Endast admin kan ta bort poster

// Hantering av bilder
postsRouter.post('/upload', authenticateToken, uploadImage); // Endast inloggade användare
postsRouter.get('/image/:id', getImage); // Öppen route
