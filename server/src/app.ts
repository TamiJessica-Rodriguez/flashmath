// // import cookieSession from 'cookie-session';
// import 'dotenv/config';
// import express, { type NextFunction, type Request, type Response } from 'express';
// import 'express-async-errors';

// // import { imagesRouter } from './images/images-router';
// // import { postsRouter } from './posts/post-router';
// import { userRouter } from './users/user-router';

// export const app = express();

// // app.use('/api/posts', postsRouter);
// app.use('/api/users', userRouter);
// // app.use('/api/images', imagesRouter);

// //error handler
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//     console.log(err);
//     res.status(500).json('Ett oväntat fel har uppstått');
// });

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

// Middleware: Configure cookies
app.use(
    cookieSession({
        name: 'login',
        secret: process.env.COOKIE_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        httpOnly: true, // Prevent client-side access to the cookie
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
