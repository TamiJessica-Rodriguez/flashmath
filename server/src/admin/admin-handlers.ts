import argon2 from 'argon2';
import type { Request, Response } from 'express';
import { z } from 'zod';
import { AdminModel, AdminZodSchema } from './admin-model';

/* Hämta alla admin */
export async function getAdmin(req: Request, res: Response) {
    const admin = await AdminModel.find({});
    res.status(200).json(admin);
}

// Skapa en ny admin via Frontend
export const createAdmin = async (req: Request, res: Response) => {
    const adminData = req.body;
    const { adminName, password } = adminData;
    if (!adminName || !password) {
        return res.status(400).json('Missing adminName or password');
    }

    try {
        console.log('Received user data:', adminData);

        const validatedData = AdminZodSchema.parse(adminData);

        console.log('Validated admin data:', validatedData);

        const existingAdminInDB = await AdminModel.findOne({
            adminName: validatedData.username,
        });
        if (existingAdminInDB) {
            console.log('Admin already exists:', existingAdminInDB);
            return res.status(409).json('Användarnamnet finns redan');
        }

        const newAdmin = new AdminModel(validatedData);
        await newAdmin.save();

        console.log('New user created:', newAdmin);

        const admin = await AdminModel.findOne({
            username: validatedData.username,
        }).select('-password');

        console.log('Admin sent in response:', admin);

        res.status(201).send(admin);
    } catch (error) {
        console.error('Error creating admin:', error);
        if (error instanceof z.ZodError) {
            return res.status(400).json('Ogiltiga användaruppgifter');
        }
        res.status(500).json('Kunde inte registrera användaren');
    }
};

/* Updatera befintlig admin */
export async function updateAdmin(req: Request, res: Response) {
    try {
        const updatedAdmin = await AdminModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin hittades inte' });
        }
        res.status(200).json(updatedAdmin);
    } catch (error) {
        res.status(500).json({ message: 'Problem att uppdatera en admin', error: error });
    }
}

/* Ta bort befintlig admin */
export async function deleteAdmin(req: Request, res: Response) {
    try {
        const deletedAdmin = await AdminModel.findByIdAndDelete(req.params.id);
        if (!deleteAdmin) {
            return res.status(404).json({ message: 'Admin hittades inte' });
        }
        res.status(200).json({ message: 'Du har tagit bort din admin' });
    } catch (error) {
        res.status(500).json({ message: 'Problem att ta bort en admin', error: error });
    }
}

/* Hämta befintlig admin med ID */
export async function getAdminById(req: Request, res: Response) {
    try {
        const admin = await AdminModel.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin hittas inte' });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Fel vid hämtning av admin', error: error });
    }
}

/* Logga in admin */
export const loginAdmin = async (req: Request, res: Response) => {
    const { adminName, password } = req.body;

    try {
        const admin = await AdminModel.findOne({ adminName }).select('+password');

        if (!admin) {
            return res.status(401).json('Fel admin eller lösenord');
        }

        const isPasswordValid = await argon2.verify(admin.password, password);

        if (!isPasswordValid) {
            return res.status(401).json('Fel admin eller lösenord');
        }
        req.session!._id = admin._id;

        return res.status(200).json('Du är nu inloggad!');
    } catch (error) {
        console.error('Fel vid inloggning:', error);
        return res.status(500).json({ error: 'Kunde inte logga in' });
    }
};

/* Logga ut en admin */
export const logoutAdmin = async (req: Request, res: Response) => {
    try {
        res.clearCookie('session');
        res.status(204).json('Du är nu utloggad');
    } catch (error) {
        res.status(500).json({ error: 'Problem att logga ut' });
    }
};
