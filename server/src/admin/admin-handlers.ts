import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { AdminModel, AdminZodSchema } from './admin-model';

/** Hämta alla admins */
export const getAllAdmins = async (req: Request, res: Response) => {
    try {
        const admins = await AdminModel.find().select('-password'); // Exkludera lösenord
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

        // Hasha lösenordet och skapa en ny admin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
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
        const updatedAdmin = await AdminModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Validera vid uppdatering
        );
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
        const admin = await AdminModel.findById(req.params.id).select('-password'); // Exkludera lösenord
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
        // Kontrollera om användaren finns
        const admin = await AdminModel.findOne({ username }).select('+password');
        console.log('Hittad admin:', admin);

        if (!admin) {
            console.error('Admin hittades inte:', username);
            return res.status(401).json({ message: 'Fel användarnamn eller lösenord' });
        }

        // Validera lösenord med bcrypt
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        console.log('Lösenordsvalidering:', isPasswordValid);

        if (!isPasswordValid) {
            console.error('Fel lösenord för:', username);
            return res.status(401).json({ message: 'Fel användarnamn eller lösenord' });
        }

        // Skicka tillbaka admin-data
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
