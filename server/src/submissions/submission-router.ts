import express from 'express';
import multer from 'multer';
import { authenticateToken } from '../middleware';
import { asyncHandler } from '../utils/asyncHandler';
import { createSubmission, deleteSubmission, getSubmissionById, getSubmissionsByUserId, updateSubmission } from './submission-handlers';

const upload = multer({ dest: 'uploads/' });
const submissionRouter = express.Router();

submissionRouter.post('/', authenticateToken, upload.single('file'), asyncHandler(createSubmission));
submissionRouter.put('/:id', authenticateToken, upload.single('file'), asyncHandler(updateSubmission));
submissionRouter.delete('/:id', authenticateToken, asyncHandler(deleteSubmission));
submissionRouter.get('/:id', authenticateToken, asyncHandler(getSubmissionById));
submissionRouter.get('/userSubmissions/:id', authenticateToken, asyncHandler(getSubmissionsByUserId));

export { submissionRouter };
