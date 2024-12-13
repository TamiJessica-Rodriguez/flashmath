import mongoose, { InferSchemaType, SchemaTypes } from 'mongoose';
import { z } from 'zod';

/**
 * Schema for creating a post with required fields.
 */
const PostSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        imageId: { type: SchemaTypes.ObjectId, required: false },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        publishDate: { type: Date, default: Date.now },
        projectId: { type: Number, required: true }, // Category ID to group posts
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

/**
 * Virtual property for image URL generation.
 */
PostSchema.virtual('imageUrl').get(function () {
    return '/api/images/' + this.imageId;
});

/**
 * Zod schema for validating posts.
 */
const PostZodSchema = z.object({
    _id: z.string().optional(),
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    imageId: z.string().optional(),
    author: z.string(),
    projectId: z.number(),
});

/**
 * Schema for creating a post without _id and author.
 */
export const PostCreateZodSchema = PostZodSchema.omit({
    _id: true,
    author: true,
});

export const PostModel = mongoose.model('Post', PostSchema);
export type Post = InferSchemaType<typeof PostSchema>;
export { PostZodSchema };
