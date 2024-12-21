import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AdminModel } from './admin-model';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is missing in environment variables');
}

/** Fetch all admins */
export const getAllAdmins = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admins = await AdminModel.find().select('-password');
        res.status(200).json(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        next(error); // Forward error to the error-handling middleware
    }
};

/** Create a new admin */
export const createAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { firstname, lastname, username, password } = req.body;

        // Check if the username already exists
        const existingAdmin = await AdminModel.findOne({ username });
        if (existingAdmin) {
            res.status(409).json({ message: 'Username already exists' });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin
        const newAdmin = new AdminModel({
            firstname,
            lastname,
            username,
            password: hashedPassword,
        });
        await newAdmin.save();

        res.status(201).json({
            message: 'Admin successfully created',
            admin: { firstname, lastname, username },
        });
    } catch (error) {
        console.error('Error creating admin:', error);
        next(error); // Pass the error to the global error handler
    }
};

/** Update an admin */
export const updateAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        // If the password is being updated, hash it
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const updatedAdmin = await AdminModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedAdmin) {
            res.status(404).json({ message: 'Admin not found' });
            return;
        }

        res.status(200).json({ message: 'Admin updated successfully', admin: updatedAdmin });
    } catch (error) {
        console.error('Error updating admin:', error);
        next(error); // Forward the error to the global error handler
    }
};

/** Delete an admin */
export const deleteAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        const deletedAdmin = await AdminModel.findByIdAndDelete(id);
        if (!deletedAdmin) {
            res.status(404).json({ message: 'Admin not found' });
            return;
        }

        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        console.error('Error deleting admin:', error);
        next(error); // Forward the error to the global error handler
    }
};

/** Get an admin by ID */
export const getAdminById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;

        const admin = await AdminModel.findById(id).select('-password');
        if (!admin) {
            res.status(404).json({ message: 'Admin not found' });
            return;
        }

        res.status(200).json(admin);
    } catch (error) {
        console.error('Error fetching admin by ID:', error);
        next(error); // Forward the error to the global error handler
    }
};


/** Log in as admin */
export const loginAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username, password } = req.body;

        // Find admin by username and include password in the result
        const admin = await AdminModel.findOne({ username }).select('+password');
        if (!admin) {
            res.status(401).json({ message: 'Incorrect username or password' });
            return;
        }

        // Compare provided password with hashed password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Incorrect password' });
            return;
        }

        // Generate a JWT token
        const token = jwt.sign({ id: admin._id, username: admin.username, isAdmin: admin.isAdmin }, JWT_SECRET, { expiresIn: '1h' });

        // Respond with the token and user details
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: admin._id,
                username: admin.username,
                isAdmin: admin.isAdmin,
            },
        });
    } catch (error) {
        console.error('Error logging in admin:', error);
        next(error); // Pass the error to the global error handler
    }
};
