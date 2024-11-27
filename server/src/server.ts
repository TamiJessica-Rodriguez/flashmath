import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app } from './app';
dotenv.config();

// const dotenv = require('dotenv');
// dotenv.config();

// const mongoose = require('mongoose');

// HÄR SKRIVER NI KODEN FÖR ATT ANSLUTA TILL DATABASEN OCH STARTA SERVERN!
main().catch((error) => console.error(error));

async function main() {
    // console.log(process.env.MONGO_URI!);
    await mongoose.connect('mongodb+srv://tamijessicarodriguez:Z4eC95Ccrgf7UFD5@flashmath.hb7x4.mongodb.net/?retryWrites=true&w=majority&appName=FlashMath'), console.log('connected to database');
    app.listen(3000, () => console.log('hello world', 'http://localhost:3000'));
}
