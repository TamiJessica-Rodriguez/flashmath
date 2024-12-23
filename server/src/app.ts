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
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
        credentials: true, // Allow cookies/authentication
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

// import cors from 'cors';
// import 'dotenv/config';
// import express, { NextFunction, Request, Response } from 'express';
// import { adminRouter } from './admin/admin-router';
// import { imagesRouter } from './images/images-router';
// import { postsRouter } from './posts/post-router';
// import { submissionRouter } from './submissions/submission-router';
// import { userRouter } from './users/user-router';

// const app = express();

// // Middleware för att parsa JSON-data
// app.use(express.json());

// // CORS-konfiguration
// app.use(
//     cors({
//         origin: ['http://localhost:3000', 'https://teal-pastelito-608a67.netlify.app/'],
//         methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//         credentials: true,
//     })
// );

// // Hantera preflight-förfrågningar
// app.options('*', cors());

// // Definiera API-rutter
// app.use('/api/users', userRouter);
// app.use('/api/submissions', submissionRouter);
// app.use('/api/admin', adminRouter);
// app.use('/api/posts', postsRouter);
// app.use('/api/images', imagesRouter);

// // Root route för att hantera GET-förfrågningar till "/"
// app.get('/', (req: Request, res: Response) => {
//     res.json({
//         message: 'Välkommen till FlashMath API!',
//         endpoints: {
//             users: '/api/users',
//             submissions: '/api/submissions',
//             admin: '/api/admin',
//             posts: '/api/posts',
//             images: '/api/images',
//         },
//     });
// });

// // Testa CORS-funktionalitet
// app.get('/test-cors', (req: Request, res: Response) => {
//     res.json({ message: 'CORS fungerar!' });
// });

// // Global felhantering
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//     console.error('Error:', err.stack || err);
//     res.status(500).json({ error: 'Ett oväntat fel har uppstått' });
// });

// export { app };

// import cors from 'cors';
// import 'dotenv/config';
// import express, { NextFunction, Request, Response } from 'express';
// import { adminRouter } from './admin/admin-router';
// import { imagesRouter } from './images/images-router';
// import { postsRouter } from './posts/post-router';
// import { submissionRouter } from './submissions/submission-router';
// import { userRouter } from './users/user-router';

// const app = express();


// app.use(express.json());

// // CORS-konfiguration
// const allowedOrigins = [
//     'https://frabjous-crumble-5798cb.netlify.app', // Produktions-frontend
// ];

// app.use(
//     cors({
//         origin: allowedOrigins,
//         methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//         allowedHeaders: ['Content-Type', 'Authorization'], // Tillåtna headers
//         credentials: true,
//     })
// );

// // Hantera preflight-förfrågningar
// app.options('*', (req, res) => {
//     res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
//     res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
//     res.sendStatus(200);
// });

// // Definiera API-rutter
// app.use('/api/users', userRouter);
// app.use('/api/submissions', submissionRouter);
// app.use('/api/admin', adminRouter);
// app.use('/api/posts', postsRouter);
// app.use('/api/images', imagesRouter);

// // Root route för att hantera GET-förfrågningar till "/"
// app.get('/', (req: Request, res: Response) => {
//     res.json({
//         message: 'Välkommen till FlashMath API!',
//         endpoints: {
//             users: '/api/users',
//             submissions: '/api/submissions',
//             admin: '/api/admin',
//             posts: '/api/posts',
//             images: '/api/images',
//         },
//     });
// });

// // Testa CORS-funktionalitet
// app.get('/test-cors', (req: Request, res: Response) => {
//     res.json({ message: 'CORS fungerar!' });
// });

// // Global felhantering
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//     console.error('Error:', err.stack || err);
//     res.status(500).json({ error: 'Ett oväntat fel har uppstått' });
// });

// export { app };
