import { Request, Response } from 'express';
import { SubmissionCreateZodSchema, SubmissionModel, SubmissionZodSchema } from './submission-model';

/**
 * Get all submissions from database
 */
export async function getSubmissions(req: Request, res: Response) {
    try {
        const submissions = await SubmissionModel.find({});
        res.status(200).json(submissions);
    } catch (error) {
        console.error('Error retrieving submissions:', error);
        res.status(500).json({ message: 'Error retrieving submissions', error });
    }
}

/**
 * Create new submission with validation from zodschema and save to database
 */
export const createSubmission = async (req: Request, res: Response) => {
    try {
        if (!req.session?._id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const validatedData = SubmissionCreateZodSchema.safeParse(req.body);

        if (!validatedData.success) {
            return res.status(400).json(validatedData.error.message);
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
            author: req.session._id,
            file: fileData,
        });

        await newSubmission.save();

        res.status(201).json(newSubmission);
    } catch (error) {
        console.error('Error creating submission:', error);
        res.status(500).json('Failed to create submission');
    }
};

/**
 * Update a submission
 */
export async function updateSubmission(req: Request, res: Response) {
    try {
        if (!req.session || !req.session._id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const submissionToUpdate = await SubmissionModel.findById(req.params.id);

        if (!submissionToUpdate) {
            return res.status(404).json(`Submission with id: ${req.params.id} not found`);
        }

        if (!submissionToUpdate.author || (submissionToUpdate.author.toString() !== req.session._id && !req.session.isAdmin)) {
            return res.status(403).json(`Only the author or administrators can update this submission`);
        }

        const validatedData = SubmissionZodSchema.safeParse(req.body);

        if (!validatedData.success) {
            return res.status(400).json(validatedData.error.message);
        }

        const fileData = req.file
            ? {
                  filename: req.file.filename,
                  path: req.file.path,
                  mimetype: req.file.mimetype,
              }
            : submissionToUpdate.file;

        const updatedSubmission = await SubmissionModel.findByIdAndUpdate(req.params.id, { ...validatedData.data, file: fileData }, { new: true });

        res.status(200).json(updatedSubmission);
    } catch (error) {
        res.status(500).json({ message: 'Error updating submission', error });
    }
}

/**
 * Delete a submission
 */
export async function deleteSubmission(req: Request, res: Response) {
    try {
        if (!req.session) {
            return res.status(401).json('Unauthorized');
        }

        const submissionToDelete = await SubmissionModel.findById(req.params.id);

        if (!submissionToDelete) {
            return res.status(404).json(`Submission with id: ${req.params.id} not found`);
        }

        if (!req.session.isAdmin && submissionToDelete.author?.toString() !== req.session._id) {
            return res.status(403).json('Only administrators or the author can delete this submission');
        }

        await SubmissionModel.findByIdAndDelete(req.params.id);

        res.status(204).json('Submission deleted successfully');
    } catch (error) {
        console.error('Error deleting submission:', error);
        res.status(500).json('Error deleting submission');
    }
}

/**
 * Get a submission by id
 */
export async function getSubmissionById(req: Request, res: Response) {
    try {
        const submission = await SubmissionModel.findById(req.params.id);
        if (submission) {
            return res.status(200).json(submission);
        } else {
            return res.status(404).json(`Submission with id ${req.params.id} was not found`);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving the submission', error });
    }
}

/**
 * Get all submissions from a user
 */
export async function getSubmissionsByUserId(req: Request, res: Response) {
    try {
        const userId = req.params.id;
        const submissions = await SubmissionModel.find({ author: userId });

        if (submissions.length === 0) {
            return res.status(404).json({ message: 'No submissions found for this user' });
        }
        res.status(200).json(submissions);
    } catch (error) {
        console.error('Error retrieving submissions:', error);
        res.status(500).json({ message: 'Error retrieving submissions', error });
    }
}
