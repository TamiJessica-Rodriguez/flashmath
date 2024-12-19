import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Declare a type for `req.user` (for better TypeScript support)
declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            id: string;
            username: string;
            isAdmin?: boolean;
        };
    }
}

// Load the secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('Missing JWT_SECRET in environment variables');
}

/**
 * Middleware to verify JWT token.
 */
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return; // Ensure no further execution
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(403).json({ message: 'Invalid or expired token' });
            return; // Ensure no further execution
        }

        // Save the decoded payload to req.user
        req.user = decoded as { id: string; username: string; isAdmin?: boolean };
        next(); // Proceed to the next middleware or route handler
    });
};

/**
 * Middleware to check if the user is logged in.
 */
export const isLoggedIn = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
        res.status(401).json({ message: 'You are not logged in' });
        return; // Ensure no further execution
    }
    next(); // Proceed to the next middleware or route handler
};

/**
 * Middleware to check if the user is an admin.
 */
export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user?.isAdmin) {
        res.status(403).json({ message: 'Access restricted to administrators only' });
        return; // Ensure no further execution
    }
    next(); // Proceed to the next middleware or route handler
};
