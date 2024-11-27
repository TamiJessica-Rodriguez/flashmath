// import cookieSession from 'cookie-session';
import 'dotenv/config';
import express, { type NextFunction, type Request, type Response } from 'express';
import 'express-async-errors';

// import { imagesRouter } from './images/images-router';
// import { postsRouter } from './posts/post-router';
// import { userRouter } from './users/user-router';

export const app = express();

app.use(express.json());
// app.use(
//     cookieSession({
//         name: 'login',
//         secret: process.env.COOKIE_SECRET,
//         maxAge: 1000 * 60 * 60 * 24 * 7,
//         httpOnly: true,
//     })
// );

// app.use('/api/posts', postsRouter);
// app.use('/api/users', userRouter);
// app.use('/api/images', imagesRouter);

//error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(500).json('Ett oväntat fel har uppstått');
});
