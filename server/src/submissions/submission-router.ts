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

submissionsRouter.get('/', getSubmissions);
submissionsRouter.post('/', isLoggedIn, upload.single('file'), createSubmission); // File upload
submissionsRouter.delete('/:id', isLoggedIn, deleteSubmission);
submissionsRouter.put('/:id', isLoggedIn, upload.single('file'), updateSubmission); // Allow file replacement
submissionsRouter.get('/:id', getSubmissionById);
submissionsRouter.get('/userSubmissions/:id', getSubmissionsByUserId);
