import mongoose from 'mongoose';
import { app } from './app';

async function main() {
    try {
        // Anslut till MongoDB
        await mongoose.connect('mongodb+srv://tamijessicarodriguez:Z4eC95Ccrgf7UFD5@flashmath.hb7x4.mongodb.net/FlashMath?retryWrites=true&w=majority&appName=FlashMath');
        console.log('Connected to database:', mongoose.connection.name);

        // Starta servern
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    } catch (error) {
        console.error('Error connecting to database or starting server:', error);
    }
}

main();
