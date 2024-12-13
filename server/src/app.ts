import cookieSession from 'cookie-session';
import cors from 'cors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { adminRouter } from './admin/admin-router';
import { imagesRouter } from './images/images-router';
import { postsRouter } from './posts/post-router';
import { submissionsRouter } from './submissions/submission-router';
import { userRouter } from './users/user-router';

if (!process.env.COOKIE_SECRET) {
    throw new Error('Missing COOKIE_SECRET in environment variables');
}

const app = express();

// Middleware: Parse incoming JSON
app.use(express.json());

app.use(
    cookieSession({
        name: 'session',
        secret: process.env.COOKIE_SECRET || 'default_secret',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'lax', // Prevent CSRF attacks
    })
);

// Middleware: CORS
app.use(
    cors({
        origin: 'http://localhost:5173', // Your frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
        credentials: true, // Allow cookies or credentials
    })
);

// Routes
app.use('/api/users', userRouter);
app.use('/api/submissions', submissionsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/posts', postsRouter);
app.use('/api/images', imagesRouter);

// (Optional) Test CORS Endpoint
app.get('/test-cors', (req, res) => {
    res.json({ message: 'CORS fungerar!' });
});

// Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err.stack || err);
    res.status(500).send('Ett oväntat fel har uppstått');
});

export { app };
