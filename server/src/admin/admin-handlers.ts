import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AdminModel } from './admin-model';

const JWT_SECRET = process.env.JWT_SECRET;


/** Hämta alla admins */
export const getAllAdmins = async (req: Request, res: Response) => {
    try {
        const admins = await AdminModel.find().select('-password');
        res.status(200).json(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ message: 'Kunde inte hämta admins', error });
    }
};

/** Skapa en ny admin */
export const createAdmin = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, username, password } = req.body;

        // Kontrollera om användarnamnet redan finns
        const existingAdmin = await AdminModel.findOne({ username });
        if (existingAdmin) {
            return res.status(409).json({ message: 'Användarnamnet finns redan' });
        }

        // Hasha lösenord
        const hashedPassword = await bcrypt.hash(password, 10);

        // Skapa ny admin
        const newAdmin = new AdminModel({
            firstname,
            lastname,
            username,
            password: hashedPassword,
        });
        await newAdmin.save();

        res.status(201).json({ message: 'Admin skapad framgångsrikt', admin: { firstname, lastname, username } });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ message: 'Kunde inte skapa admin', error });
    }
};

/** Uppdatera en admin */
export const updateAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Om lösenord uppdateras, hash det
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const updatedAdmin = await AdminModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin hittades inte' });
        }
        res.status(200).json({ message: 'Admin uppdaterad', admin: updatedAdmin });
    } catch (error) {
        console.error('Error updating admin:', error);
        res.status(500).json({ message: 'Kunde inte uppdatera admin', error });
    }
};

/** Ta bort en admin */
export const deleteAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedAdmin = await AdminModel.findByIdAndDelete(id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: 'Admin hittades inte' });
        }
        res.status(200).json({ message: 'Admin borttagen' });
    } catch (error) {
        console.error('Error deleting admin:', error);
        res.status(500).json({ message: 'Kunde inte ta bort admin', error });
    }
};

/** Hämta en admin via ID */
export const getAdminById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const admin = await AdminModel.findById(id).select('-password');
        if (!admin) {
            return res.status(404).json({ message: 'Admin hittades inte' });
        }
        res.status(200).json(admin);
    } catch (error) {
        console.error('Error fetching admin:', error);
        res.status(500).json({ message: 'Kunde inte hämta admin', error });
    }
};

/** Logga in som admin */
export const loginAdmin = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const admin = await AdminModel.findOne({ username }).select('+password');
        if (!admin) {
            return res.status(401).json({ message: 'Fel användarnamn eller lösenord' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Fel lösenord' });
        }

        // Kontrollera att JWT_SECRET är definierad
        if (!JWT_SECRET) {
            return res.status(500).json({ message: 'JWT hemlig nyckel saknas' });
        }

        // Skapa JWT-token
        const token = jwt.sign(
            { id: admin._id, username: admin.username, isAdmin: admin.isAdmin },
            JWT_SECRET,
            { expiresIn: '1h' } // Tokenens giltighetstid
        );

        res.status(200).json({
            message: 'Inloggning lyckades',
            token, // Returnera token till frontend
            user: {
                id: admin._id,
                username: admin.username,
                isAdmin: admin.isAdmin,
            },
        });
    } catch (error) {
        console.error('Error logging in admin:', error);
        res.status(500).json({ message: 'Kunde inte logga in', error });
    }
};
