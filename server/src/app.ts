// import cors from 'cors';
// import 'dotenv/config';
// import express, { NextFunction, Request, Response } from 'express';
// import { adminRouter } from './admin/admin-router';
// import { imagesRouter } from './images/images-router';
// import { postsRouter } from './posts/post-router';
// import { submissionRouter } from './submissions/submission-router';
// import { userRouter } from './users/user-router';

// const app = express();

// // Middleware: Parse incoming JSON
// app.use(express.json());

// // Middleware: CORS
// // app.use(
// //     cors({
// //         origin: 'http://localhost:5173',
// //         methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
// //         credentials: true, // Allow cookies/authentication
// //     })
// // );

// app.use(
//     cors({
//         origin: ['http://localhost:3000', 'https://flashmath-h2ch.vercel.app'], // Tillåt localhost och Vercel-URL
//         methods: ['GET', 'POST', 'PUT', 'DELETE'], // Tillåtna metoder
//         credentials: true, // Tillåt credentials (cookies etc.)
//     })
// );

// // Routes
// app.use('/api/users', userRouter);
// app.use('/api/submissions', submissionRouter);
// app.use('/api/admin', adminRouter);
// app.use('/api/posts', postsRouter);
// app.use('/api/images', imagesRouter);

// // (Optional) Test CORS Endpoint
// app.get('/test-cors', (req: Request, res: Response) => {
//     res.json({ message: 'CORS fungerar!' });
// });

// // Error Handling Middleware
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//     console.error('Error:', err.stack || err);
//     res.status(500).json({ error: 'Ett oväntat fel har uppstått' });
// });

// export { app };

import cors from 'cors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { adminRouter } from './admin/admin-router';
import { imagesRouter } from './images/images-router';
import { postsRouter } from './posts/post-router';
import { submissionRouter } from './submissions/submission-router';
import { userRouter } from './users/user-router';

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: ['http://localhost:3000', 'https://flashmath-h2ch.vercel.app', 'https://famous-axolotl-da8219.netlify.app', 'https://flashmath-15.onrender.com'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
);

app.options('*', cors());

app.use('/api/users', userRouter);
app.use('/api/submissions', submissionRouter);
app.use('/api/admin', adminRouter);
app.use('/api/posts', postsRouter);
app.use('/api/images', imagesRouter);

app.get('/test-cors', (req: Request, res: Response) => {
    res.json({ message: 'CORS fungerar!' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err.stack || err);
    res.status(500).json({ error: 'Ett oväntat fel har uppstått' });
});

export { app };
