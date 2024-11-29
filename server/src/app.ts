import cookieSession from 'cookie-session';
import cors from 'cors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { userRouter } from './users/user-router';

if (!process.env.COOKIE_SECRET) {
    throw new Error('Missing COOKIE_SECRET in environment variables');
}

const app = express();

// Middleware: Parse incoming JSON
app.use(express.json());

app.use(
    cookieSession({
        name: 'login',
        secret: process.env.COOKIE_SECRET, // Din hemliga nyckel från .env
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dagar
        httpOnly: true, // Förhindrar åtkomst till cookien från JavaScript
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
