import express from 'express';
import { authenticateToken } from '../middleware';
import { getImage, uploadImage } from './images-handlers';

export const imagesRouter = express.Router();

// Endast inloggade användare kan ladda upp bilder
imagesRouter.post('/', authenticateToken, uploadImage);

// Bildhämtning är öppen för alla
imagesRouter.get('/:id', getImage);
