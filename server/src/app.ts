import cors from 'cors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { adminRouter } from './admin/admin-router';
import { imagesRouter } from './images/images-router';
import { postsRouter } from './posts/post-router';
import { submissionsRouter } from './submissions/submission-router';
import { userRouter } from './users/user-router';

const app = express();

// Middleware: Parse incoming JSON
app.use(express.json());

// Middleware: CORS
app.use(
    cors({
        origin: 'http://localhost:5173', // Din frontend-URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Tillåtna HTTP-metoder
        credentials: true, // Tillåt cookies eller autentisering via headers
    })
);

// Routes
app.use('/api/users', userRouter);
app.use('/api/submissions', submissionsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/posts', postsRouter);
app.use('/api/images', imagesRouter);

// (Optional) Test CORS Endpoint
app.get('/test-cors', (req: Request, res: Response) => {
    res.json({ message: 'CORS fungerar!' });
});

// Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err.stack || err);
    res.status(500).send('Ett oväntat fel har uppstått');
});

export { app };
