import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { z } from 'zod';
import { UserModel, UserZodSchema } from '../users/user-model';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
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
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const validatedData = UserZodSchema.parse(req.body);

        const existingUser = await UserModel.findOne({ username: validatedData.username });
        if (existingUser) {
            res.status(409).json({ message: 'Användarnamnet finns redan' });
            return;
        }

        const newUser = new UserModel(validatedData);
        await newUser.save();

        res.status(201).json({
            message: 'Användare skapad',
            user: {
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                username: newUser.username,
                avatar: newUser.avatar,
            },
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                message: 'Ogiltiga användaruppgifter',
                errors: error.errors,
            });
            return;
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

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Ogiltigt ID' });
        }

        const updateSchema = z.object({
            username: z.string().min(3).optional(),
            password: z.string().min(6).optional(),
        });

        const validatedData = updateSchema.parse(req.body);

        if (validatedData.password) {
            const salt = await bcrypt.genSalt(10);
            validatedData.password = await bcrypt.hash(validatedData.password, salt);
        }

        const updatedUser = await UserModel.findByIdAndUpdate(id, { $set: validatedData }, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'Användaren hittades inte' });
        }

        res.status(200).json({
            message: 'Användare uppdaterad',
            user: {
                firstname: updatedUser.firstname,
                lastname: updatedUser.lastname,
                username: updatedUser.username,
            },
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ message: 'Ogiltiga uppgifter', errors: error.errors });
        }
        res.status(500).json({ message: 'Kunde inte uppdatera användaren' });
    }
};

// Hashar ett lösenord
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Fel användarnamn eller lösenord' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Fel lösenord' });
        }

        // Skapa JWT-token
        const token = jwt.sign(
            { id: user._id, username: user.username, isAdmin: user.isAdmin }, // Payload
            JWT_SECRET as string,
            { expiresIn: '1h' } // Giltighetstid
        );

        res.status(200).json({
            message: 'Inloggning lyckades',
            token, // Skicka tillbaka JWT-token
            user: {
                id: user._id,
                username: user.username,
                avatar: user.avatar,
                isAdmin: user.isAdmin,
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Kunde inte logga in' });
    }
};

export const logoutUser = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Utloggning lyckades' });
};
