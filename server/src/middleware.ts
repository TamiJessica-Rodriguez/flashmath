import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

// Deklarera en typ för `req.user` (för bättre TypeScript-stöd)
declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            id: string;
            username: string;
            isAdmin?: boolean;
        };
    }
}

// Läs in den hemliga nyckeln från miljövariabler
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET är inte definierad i miljövariablerna');
}

/**
 * Middleware för att verifiera JWT-token.
 */
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1]; // Extrahera token från Authorization-headern

    if (!token) {
        return res.status(401).json({ message: 'Ingen token skickades' });
    }

    jwt.verify(token, JWT_SECRET, (err: VerifyErrors | null, decoded: JwtPayload | undefined | string) => {
        if (err) {
            return res.status(403).json({ message: 'Ogiltig eller förfallen token' });
        }

        // Kontrollera att decoded faktiskt innehåller de förväntade egenskaperna
        if (decoded && typeof decoded === 'object') {
            req.user = decoded as { id: string; username: string; isAdmin?: boolean };
        }
        next();
    });
};

/**
 * Middleware för att kontrollera om användaren är inloggad.
 */
export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Du är inte inloggad' });
    }
    next();
};

/**
 * Middleware för att kontrollera om användaren är admin.
 */
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.isAdmin) {
        return res.status(403).json({ message: 'Endast administratörer har tillgång' });
    }
    next();
};
