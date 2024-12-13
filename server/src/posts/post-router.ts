import express from 'express';
import { getImage, uploadImage } from '../images/images-handlers';
import { createPosts, deletePost, getPosts, updatePost } from './post-handlers';

export const postsRouter = express.Router();

postsRouter.get('/', getPosts);
postsRouter.post('/', createPosts);
postsRouter.put('/:id', updatePost);
postsRouter.delete('/:id', deletePost);

postsRouter.post('/upload', uploadImage);
postsRouter.get('/image/:id', getImage);
