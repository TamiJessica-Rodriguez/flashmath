import { Request, Response } from 'express';
import { z } from 'zod';
import { UserModel, UserZodSchema } from './user-model';

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

/**
 * Skapa en ny användare.
 */
export const createUser = async (req: Request, res: Response) => {
    try {
        // Validera inkommande data med Zod
        const validatedData = UserZodSchema.parse(req.body);

        // Kontrollera om användarnamnet redan finns
        const existingUser = await UserModel.findOne({ username: validatedData.username });
        if (existingUser) {
            return res.status(409).json({ message: 'Användarnamnet finns redan' });
        }

        // Skapa en ny användare
        const newUser = new UserModel(validatedData);
        await newUser.save();

        res.status(201).json({
            message: 'Användare skapad',
            user: {
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                username: newUser.username,
            },
        });
    } catch (error) {
        // Hantera Zod-fel
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: 'Ogiltiga användaruppgifter',
                errors: (error as z.ZodError).errors, // Returnera detaljer om valideringsfel
            });
        }

        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Kunde inte skapa användare' });
    }
};

import mongoose from 'mongoose';

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Kontrollera om ID är ett giltigt MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Ogiltigt ID' });
        }

        const deletedUser = await UserModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'Användaren hittades inte' });
        }

        res.status(200).json({
            message: 'Användare borttagen',
            user: {
                firstname: deletedUser.firstname,
                lastname: deletedUser.lastname,
                username: deletedUser.username,
            },
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Kunde inte ta bort användaren' });
    }
};
