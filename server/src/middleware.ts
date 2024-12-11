import { NextFunction, Request, Response } from 'express';

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session || !req.session._id) {
        return res.status(401).json({ message: 'Du är inte inloggad' });
    }
    next();
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.isAdmin) {
        return res.status(403).json({ message: 'Endast administratörer har tillgång' });
    }
    next();
};
