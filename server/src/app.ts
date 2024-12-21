import cors from 'cors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { adminRouter } from './admin/admin-router';
import { imagesRouter } from './images/images-router';
import { postsRouter } from './posts/post-router';
import { submissionRouter } from './submissions/submission-router';
import { userRouter } from './users/user-router';

const app = express();

// Middleware: Parse incoming JSON
app.use(express.json());

// Middleware: CORS
app.use(
    cors({
        origin: (origin, callback) => {
            const allowedOrigins = [
                'http://localhost:5173', // Local frontend during development
                'https://flashmath-h2ch.vercel.app', // Production frontend
                'https://flashmath-production-ba32.up.railway.app', // Production backend
            ];

            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true); // Allow the origin
            } else {
                callback(new Error('Not allowed by CORS')); // Block other origins
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
        credentials: true, // Allow cookies and credentials
    })
);

// Routes
app.use('/api/users', userRouter);
app.use('/api/submissions', submissionRouter);
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
    res.status(500).json({ error: 'Ett oväntat fel har uppstått' });
});

export { app };
