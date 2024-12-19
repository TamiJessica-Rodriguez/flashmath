import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { z } from 'zod';
import { UserModel, UserZodSchema } from '../users/user-model';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('Missing JWT_SECRET in environment variables');
}

/** Hämta alla användare från databasen. */
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

/** Skapa en ny användare. */
export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Validate incoming data
        const validatedData = UserZodSchema.parse(req.body);

        // Check if the username already exists
        const existingUser = await UserModel.findOne({ username: validatedData.username });
        if (existingUser) {
            res.status(409).json({ message: 'Användarnamnet finns redan' });
            return;
        }

        // Create a new user
        const newUser = new UserModel(validatedData);
        await newUser.save();

        // Send a successful response
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
            // Validation error
            res.status(400).json({
                message: 'Ogiltiga användaruppgifter',
                errors: error.errors,
            });
        } else {
            // Pass other errors to the error-handling middleware
            next(error);
        }
    }
};

/** Ta bort en användare */
export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        // Validate if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Ogiltigt ID' });
            return;
        }

        const deletedUser = await UserModel.findByIdAndDelete(id);

        if (!deletedUser) {
            res.status(404).json({ message: 'Användaren hittades inte' });
            return;
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
        // Pass any unexpected errors to the next middleware
        next(error);
    }
};

/** Uppdatera en användares användarnamn och/eller lösenord. */
export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: 'Ogiltigt ID' });
            return;
        }

        // Define schema for validation
        const updateSchema = z.object({
            username: z.string().min(3).optional(),
            password: z.string().min(6).optional(),
        });

        // Validate request body
        const validatedData = updateSchema.parse(req.body);

        // Hash password if it's being updated
        if (validatedData.password) {
            const salt = await bcrypt.genSalt(10);
            validatedData.password = await bcrypt.hash(validatedData.password, salt);
        }

        // Update the user in the database
        const updatedUser = await UserModel.findByIdAndUpdate(id, { $set: validatedData }, { new: true, runValidators: true });

        // If no user is found
        if (!updatedUser) {
            res.status(404).json({ message: 'Användaren hittades inte' });
            return;
        }

        // Send success response
        res.status(200).json({
            message: 'Användare uppdaterad',
            user: {
                firstname: updatedUser.firstname,
                lastname: updatedUser.lastname,
                username: updatedUser.username,
            },
        });
    } catch (error) {
        // Pass unexpected errors to Express error-handling middleware
        if (error instanceof z.ZodError) {
            res.status(400).json({ message: 'Ogiltiga uppgifter', errors: error.errors });
            return;
        }

        next(error);
    }
};
/** Logga in som användare */
export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const user = await UserModel.findOne({ username }).select('+password');
        if (!user) {
            res.status(401).json({ message: 'Fel användarnamn eller lösenord' });
            return;
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Fel lösenord' });
            return;
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, username: user.username, isAdmin: user.isAdmin },
            JWT_SECRET,
            { expiresIn: '1h' } // Token validity
        );

        // Respond with token and user details
        res.status(200).json({
            message: 'Inloggning lyckades',
            token,
            user: {
                id: user._id,
                username: user.username,
                avatar: user.avatar,
                isAdmin: user.isAdmin,
            },
        });
    } catch (error) {
        // Pass unexpected errors to the error-handling middleware
        next(error);
    }
};

/** Logga ut som användare */
export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ message: 'Utloggning lyckades' });
    } catch (error) {
        next(error);
    }
};
