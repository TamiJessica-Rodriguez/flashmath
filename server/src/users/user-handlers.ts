import { Request, Response } from 'express';
import { UserModel } from './user-model';

/**
 * Hämta alla användare från databasen.
 */
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find(); // Hämta alla användare
        console.log('Fetched users:', users); // Logga resultatet
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Kunde inte hämta användare' });
    }
};
