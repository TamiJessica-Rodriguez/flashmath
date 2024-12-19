import mongoose, { InferSchemaType } from 'mongoose';
import { z } from 'zod';

// Mongoose Schema for Submission
const SubmissionSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: false }, // Added optional description field
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        file: {
            filename: { type: String, required: false },
            path: { type: String, required: false },
            mimetype: { type: String, required: false },
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

// Virtual field for file URL
SubmissionSchema.virtual('fileUrl').get(function () {
    return this.file?.filename ? `/uploads/${this.file.filename}` : null;
});

// Zod Schema for validation
const SubmissionZodSchema = z.object({
    _id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    author: z.string(),
    file: z
        .object({
            filename: z.string(),
            path: z.string(),
            mimetype: z.string(),
        })
        .optional(),
});

// Schema for submission creation
export const SubmissionCreateZodSchema = SubmissionZodSchema.omit({ _id: true });

// Schema for submission updates
export const SubmissionUpdateZodSchema = SubmissionCreateZodSchema.partial();

// Mongoose Model
export const SubmissionModel = mongoose.model('Submission', SubmissionSchema);

// TypeScript type for Submission
export type Submission = InferSchemaType<typeof SubmissionSchema>;

export { SubmissionZodSchema };
