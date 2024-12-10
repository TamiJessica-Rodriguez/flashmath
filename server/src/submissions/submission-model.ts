import mongoose, { InferSchemaType } from 'mongoose';
import { z } from 'zod';

const SubmissionSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
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

const SubmissionZodSchema = z.object({
    _id: z.string(),
    title: z.string(),
    author: z.string(),
    file: z
        .object({
            filename: z.string(),
            path: z.string(),
            mimetype: z.string(),
        })
        .optional(),
});

SubmissionSchema.virtual('fileUrl').get(function () {
    return this.file?.filename ? `/uploads/${this.file.filename}` : null;
});

export const SubmissionCreateZodSchema = SubmissionZodSchema.omit({
    _id: true,
});

export const SubmissionModel = mongoose.model<Submission>('Submission', SubmissionSchema);
export type Submission = InferSchemaType<typeof SubmissionSchema>;
export { SubmissionZodSchema };
