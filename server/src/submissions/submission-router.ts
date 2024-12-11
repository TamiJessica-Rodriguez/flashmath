import express from 'express';
import multer from 'multer';
import { isLoggedIn } from '../middleware';
import { createSubmission, deleteSubmission, getSubmissionById, getSubmissions, getSubmissionsByUserId, updateSubmission } from './submission-handlers';

export const submissionsRouter = express.Router();

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Log incoming file upload
submissionsRouter.post('/', upload.single('file'), (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);
    res.status(200).json({ message: 'File received successfully' });
});

submissionsRouter.get('/', getSubmissions); // Hämta alla inlämningar
submissionsRouter.post('/', isLoggedIn, upload.single('file'), createSubmission); // Lägg till en ny inlämning
submissionsRouter.delete('/:id', isLoggedIn, deleteSubmission); // Ta bort en inlämning
submissionsRouter.put('/:id', isLoggedIn, upload.single('file'), updateSubmission); // Uppdatera en inlämning
submissionsRouter.get('/:id', getSubmissionById); // Hämta specifik inlämning
submissionsRouter.get('/userSubmissions/:id', getSubmissionsByUserId); // Hämta inlämningar för en specifik användare
