import express from 'express';
import multer from 'multer';
import { authenticateToken } from '../middleware';
import { createSubmission, deleteSubmission, getSubmissionById, getSubmissions, getSubmissionsByUserId, updateSubmission } from './submission-handlers';

export const submissionsRouter = express.Router();

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Hämta alla inlämningar (endast autentiserade användare)
submissionsRouter.get('/', authenticateToken, getSubmissions);

// Lägg till en ny inlämning (endast autentiserade användare)
submissionsRouter.post('/', authenticateToken, upload.single('file'), createSubmission);

// Uppdatera en inlämning (endast autentiserade användare)
submissionsRouter.put('/:id', authenticateToken, upload.single('file'), updateSubmission);

// Ta bort en inlämning (endast autentiserade användare)
submissionsRouter.delete('/:id', authenticateToken, deleteSubmission);

// Hämta specifik inlämning
submissionsRouter.get('/:id', authenticateToken, getSubmissionById);

// Hämta inlämningar för en specifik användare
submissionsRouter.get('/userSubmissions/:id', authenticateToken, getSubmissionsByUserId);
