import { NextFunction, Request, Response } from 'express';

/** Tittar om användaren är inloggad */
export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?._id) {
        return res.status(401).json('Du är inte inloggad');
    }
    next();
};
