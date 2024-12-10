import { NextFunction, Request, Response } from 'express';

/** Kontrollerar om användaren är inloggad */
export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session || !req.session._id) {
        console.error('Access denied: User not logged in');
        return res.status(401).json({ message: 'Du är inte inloggad. Logga in för att få åtkomst.' });
    }
    next();
};

/** Kontrollerar om användaren är administratör */
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session || !req.session.isAdmin) {
        console.error('Access denied: User is not an admin');
        return res.status(403).json({ message: 'Du har inte rättigheter att göra detta. Endast administratörer har åtkomst.' });
    }
    next();
};

/** Kontrollerar om användaren är inloggad och administratör */
export const isLoggedInAndAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session || !req.session._id) {
        console.error('Access denied: User not logged in');
        return res.status(401).json({ message: 'Du är inte inloggad. Logga in för att få åtkomst.' });
    }

    if (!req.session.isAdmin) {
        console.error('Access denied: User is not an admin');
        return res.status(403).json({ message: 'Du har inte rättigheter att göra detta. Endast administratörer har åtkomst.' });
    }

    next();
};
