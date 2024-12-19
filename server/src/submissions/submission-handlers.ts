import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { SubmissionCreateZodSchema, SubmissionModel, SubmissionUpdateZodSchema } from './submission-model';

/** Create a new submission */
export const createSubmission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedData = SubmissionCreateZodSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({ message: validatedData.error.message });
        }

        const fileData = req.file
            ? {
                  filename: req.file.filename,
                  path: req.file.path,
                  mimetype: req.file.mimetype,
              }
            : undefined;

        const newSubmission = new SubmissionModel({
            ...validatedData.data,
            author: req.user?.id,
            file: fileData,
        });

        await newSubmission.save();
        res.status(201).json(newSubmission);
    } catch (error) {
        console.error('Error creating submission:', error);
        next(error);
    }
};

/** Update an existing submission */
export const updateSubmission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid submission ID' });
        }

        const validatedData = SubmissionUpdateZodSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({ message: validatedData.error.message });
        }

        const fileData = req.file
            ? {
                  filename: req.file.filename,
                  path: req.file.path,
                  mimetype: req.file.mimetype,
              }
            : undefined;

        const updatedSubmission = await SubmissionModel.findByIdAndUpdate(id, { ...validatedData.data, ...(fileData && { file: fileData }) }, { new: true, runValidators: true });

        if (!updatedSubmission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        res.status(200).json(updatedSubmission);
    } catch (error) {
        console.error('Error updating submission:', error);
        next(error);
    }
};

/** Delete a submission */
export const deleteSubmission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const submission = await SubmissionModel.findById(id);
        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        if (submission.author.toString() !== req.user?.id && !req.user?.isAdmin) {
            return res.status(403).json({ message: 'Not authorized to delete this submission' });
        }

        await SubmissionModel.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting submission:', error);
        next(error);
    }
};

/** Get a submission by ID */
export const getSubmissionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const submission = await SubmissionModel.findById(id);
        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        res.status(200).json(submission);
    } catch (error) {
        console.error('Error retrieving submission:', error);
        res.status(500).json({ message: 'Error retrieving submission', error });
    }
};

/** Get submissions by user ID */
export const getSubmissionsByUserId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const submissions = await SubmissionModel.find({ author: id });
        if (submissions.length === 0) {
            return res.status(404).json({ message: 'No submissions found for this user' });
        }

        res.status(200).json(submissions);
    } catch (error) {
        console.error('Error retrieving submissions:', error);
        res.status(500).json({ message: 'Error retrieving submissions', error });
    }
};
