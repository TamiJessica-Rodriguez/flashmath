import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { z } from 'zod';
import { UserModel, UserZodSchema } from './user-model';

/**
 * Hämta alla användare från databasen.
 */
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        console.log('Fetched users:', users);
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

        // Hasha lösenordet
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(validatedData.password, salt);

        // Skapa en ny användare med det hashade lösenordet
        const newUser = new UserModel({
            ...validatedData,
            password: hashedPassword,
        });
        await newUser.save();

        // Returnera användarens data utan lösenord
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

/**
 * Uppdatera en användares användarnamn och/eller lösenord.
 */
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        console.log('Update request received for ID:', id);

        // Kontrollera om ID är ett giltigt MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error('Invalid ID:', id);
            return res.status(400).json({ message: 'Ogiltigt ID' });
        }

        // Validera inkommande data
        const updateSchema = z.object({
            username: z.string().min(3, 'Användarnamn måste vara minst 3 tecken långt').optional(),
            password: z.string().min(6, 'Lösenordet måste vara minst 6 tecken långt').optional(),
        });

        const validatedData = updateSchema.parse(req.body);

        // Hantera lösenordshashning om lösenordet ska uppdateras
        if (validatedData.password) {
            const salt = await bcrypt.genSalt(10);
            validatedData.password = await bcrypt.hash(validatedData.password, salt);
        }

        // Uppdatera användaren i databasen
        const updatedUser = await UserModel.findByIdAndUpdate(id, { $set: validatedData }, { new: true, runValidators: true });

        if (!updatedUser) {
            console.error('User not found for ID:', id);
            return res.status(404).json({ message: 'Användaren hittades inte' });
        }

        console.log('User updated:', updatedUser);

        res.status(200).json({
            message: 'Användare uppdaterad',
            user: {
                firstname: updatedUser.firstname,
                lastname: updatedUser.lastname,
                username: updatedUser.username,
            },
        });
    } catch (error) {
        console.error('Error updating user:', error);

        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: 'Ogiltiga uppgifter',
                errors: error.errors,
            });
        }

        res.status(500).json({ message: 'Kunde inte uppdatera användaren' });
    }
};

// Hashar ett lösenord
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}
