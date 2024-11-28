// import cors from 'cors';
// import mongoose from 'mongoose';
// import { app } from './app';

// // dotenv.config();

// // const dotenv = require('dotenv');
// // dotenv.config();

// // HÄR SKRIVER NI KODEN FÖR ATT ANSLUTA TILL DATABASEN OCH STARTA SERVERN!
// // main().catch((error) => console.error(error));

// // async function main() {
// //     // console.log(process.env.MONGO_URI!);
// //     await mongoose.connect('mongodb+srv://tamijessicarodriguez:Z4eC95Ccrgf7UFD5@flashmath.hb7x4.mongodb.net/?retryWrites=true&w=majority&appName=FlashMath'), console.log('connected to database');
// //     app.listen(3000, () => console.log('hello world', 'http://localhost:3000'));
// // }
// // Enable CORS

// // Konfigurera CORS för att tillåta förfrågningar från frontend
// app.use(
//     cors({
//         origin: 'http://localhost:5173', // Frontendens URL
//         methods: ['GET', 'POST', 'PUT', 'DELETE'], // Tillåtna metoder
//         credentials: true, // Om cookies ska skickas
//     })
// );

// app.use(
//     cors({
//         origin: 'http://localhost:5173', // Allow requests from the frontend
//         methods: 'GET,POST,PUT,DELETE', // Allowed methods
//         credentials: true, // Include cookies and credentials if needed
//     })
// );

// async function main() {
//     await mongoose.connect('mongodb+srv://tamijessicarodriguez:Z4eC95Ccrgf7UFD5@flashmath.hb7x4.mongodb.net/FlashMath?retryWrites=true&w=majority&appName=FlashMath');
//     console.log('Connected to database:', mongoose.connection.name);
//     app.listen(3000, () => console.log('hello world', 'http://localhost:3000'));
// }

// main().catch((error) => console.error(error));
// // Removed local declaration of cors function to avoid conflict with imported cors module

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
