import mongoose, { InferSchemaType, SchemaTypes } from 'mongoose';
import { z } from 'zod';

/**
 * Schema for creating a post with required fields: title, description, and imageId.
 */
const PostSchema = new mongoose.Schema(
    {
        title: { type: String, required: true }, // Titel är obligatorisk
        description: { type: String, required: true }, // Beskrivning är obligatorisk
        imageId: { type: SchemaTypes.ObjectId, required: false }, // Bild är valfri
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Koppling till användaren (user/admin)
        publishDate: { type: Date, default: Date.now }, // Publiceringsdatum
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

/**
 * Zod schema for validation of posts.
 */
const PostZodSchema = z.object({
    _id: z.string().optional(),
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    imageId: z.string().optional(),
    author: z.string(),
});

/**
 * Schema for creating a post without _id and author.
 */
export const PostCreateZodSchema = PostZodSchema.omit({
    _id: true,
    author: true,
});

/**
 * Virtual property for generating image URLs.
 */
PostSchema.virtual('imageUrl').get(function () {
    return '/api/images/' + this.imageId;
});

/**
 * Mongoose model definition.
 */
export const PostModel = mongoose.model<Post>('Post', PostSchema);
export type Post = InferSchemaType<typeof PostSchema>;
export { PostZodSchema };
