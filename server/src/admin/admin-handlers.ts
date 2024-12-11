import argon2 from 'argon2';
import { Request, Response } from 'express';
import { AdminModel, AdminZodSchema } from './admin-model';

/** Hämta alla admins */
export const getAllAdmins = async (req: Request, res: Response) => {
    try {
        const admins = await AdminModel.find();
        res.status(200).json(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ message: 'Failed to fetch admins', error });
    }
};

/** Skapa en ny admin */
export const createAdmin = async (req: Request, res: Response) => {
    try {
        // Validera inkommande data
        const validationResult = AdminZodSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({ errors: validationResult.error.errors });
        }

        const { firstname, lastname, username, password } = validationResult.data;

        // Kontrollera om användarnamnet redan finns
        const existingAdmin = await AdminModel.findOne({ username });
        if (existingAdmin) {
            return res.status(409).json({ message: 'Användarnamnet finns redan' });
        }

        // Skapa och spara en ny admin
        const hashedPassword = await argon2.hash(password);
        const newAdmin = new AdminModel({ firstname, lastname, username, password: hashedPassword });
        await newAdmin.save();

        res.status(201).json({ message: 'Admin skapad framgångsrikt', admin: newAdmin });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ message: 'Kunde inte skapa admin', error });
    }
};

/** Uppdatera en admin */
export const updateAdmin = async (req: Request, res: Response) => {
    try {
        const updatedAdmin = await AdminModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin hittades inte' });
        }
        res.status(200).json(updatedAdmin);
    } catch (error) {
        console.error('Error updating admin:', error);
        res.status(500).json({ message: 'Kunde inte uppdatera admin', error });
    }
};

/** Ta bort en admin */
export const deleteAdmin = async (req: Request, res: Response) => {
    try {
        const deletedAdmin = await AdminModel.findByIdAndDelete(req.params.id);
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
        const admin = await AdminModel.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin hittades inte' });
        }
        res.status(200).json(admin);
    } catch (error) {
        console.error('Error fetching admin:', error);
        res.status(500).json({ message: 'Kunde inte hämta admin', error });
    }
};

export const loginAdmin = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const admin = await AdminModel.findOne({ username }).select('+password');
        if (!admin) {
            return res.status(401).json({ message: 'Fel användarnamn eller lösenord' });
        }

        const isPasswordValid = await argon2.verify(admin.password, password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Fel användarnamn eller lösenord' });
        }

        res.status(200).json({
            message: 'Inloggning lyckades',
            user: {
                id: admin._id,
                username: admin.username,
                isAdmin: true,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Kunde inte logga in', error });
    }
};
