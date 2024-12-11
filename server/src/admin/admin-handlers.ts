import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { AdminModel } from './admin-model';

/** Hämta alla admins */
export const getAllAdmins = async (req: Request, res: Response) => {
    try {
        const admins = await AdminModel.find().select('-password');
        res.status(200).json(admins);
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ message: 'Failed to fetch admins', error });
    }
};

export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

/** Skapa en ny admin */
export const createAdmin = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, username, password } = req.body;
        console.log('Inkommande lösenord vid skapande:', password);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('Hashat lösenord vid skapande:', hashedPassword);

        const newAdmin = new AdminModel({
            firstname,
            lastname,
            username,
            password, // Skicka bara plain-text-lösenordet här
        });
        await newAdmin.save();

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
        const updatedAdmin = await AdminModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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
        const admin = await AdminModel.findById(req.params.id).select('-password');
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
    console.log('Inkommande lösenord vid inloggning:', password);
    try {
        const admin = await AdminModel.findOne({ username }).select('+password');
        if (!admin) {
            console.error('Admin inte hittad:', username);
            return res.status(401).json({ message: 'Fel användarnamn eller lösenord' });
        }

        console.log('Hashat lösenord från databasen:', admin.password);

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        console.log('Validering av lösenord:', isPasswordValid);

        if (!isPasswordValid) {
            console.error('Fel lösenord för admin:', username);
            return res.status(401).json({ message: 'Något är fel med lösenordet' });
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
        console.error('Fel i loginAdmin:', error);
        res.status(500).json({ message: 'Kunde inte logga in', error });
    }
};

async function testHashing() {
    const plainPassword = 'Natalia';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    console.log('Hashat lösenord:', hashedPassword);

    const isValid = await bcrypt.compare(plainPassword, hashedPassword);
    console.log('Validering av lösenord:', isValid);
}

testHashing();
