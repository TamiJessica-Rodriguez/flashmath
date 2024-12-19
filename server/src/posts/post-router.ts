import express from 'express';
import { getImage, uploadImage } from '../images/images-handlers';
import { authenticateToken, isAdmin } from '../middleware';
import { asyncHandler } from '../utils/asyncHandler';
import { createPosts, deletePost, getPosts, updatePost } from './post-handlers';

export const postsRouter = express.Router();

// Skydda alla routes med autentisering
postsRouter.get('/', authenticateToken, asyncHandler(getPosts));
postsRouter.post('/', authenticateToken, asyncHandler(createPosts));
postsRouter.put('/:id', authenticateToken, asyncHandler(updatePost));
postsRouter.delete('/:id', authenticateToken, isAdmin, asyncHandler(deletePost));

// Hantering av bilder
postsRouter.post(
    '/upload',
    authenticateToken,
    asyncHandler(async (req, res, next) => {
        // Wrap uploadImage in an async handler
        uploadImage(req, res);
        next();
    })
);

postsRouter.get('/image/:id', asyncHandler(getImage));
