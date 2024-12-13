import busboy from 'busboy';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { getImageBucket } from '../images/images-model';
import { PostModel, PostZodSchema } from './post-model';

/**
 * Get all posts.
 */
export async function getPosts(req: Request, res: Response) {
    try {
        const posts = await PostModel.find({}).sort({ publishDate: -1 });
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Failed to fetch posts', error });
    }
}

/**
 * Create a new post.
 */
export async function createPosts(req: Request, res: Response) {
    try {
        if (!req.session || !req.session._id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { title, description, imageId, projectId } = req.body;

        const validImageId = mongoose.isValidObjectId(imageId) ? imageId : undefined;

        const newPost = new PostModel({
            title,
            description,
            imageId: validImageId,
            author: req.session._id,
            projectId,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Failed to create post', error });
    }
}

/**
 * Update a post.
 */
export async function updatePost(req: Request, res: Response) {
    try {
        if (!req.session || !req.session._id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const postToUpdate = await PostModel.findById(req.params.id);
        if (!postToUpdate) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (postToUpdate.author.toString() !== req.session._id && !req.session.isAdmin) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const validatedData = PostZodSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json(validatedData.error.errors);
        }

        const updatedPost = await PostModel.findByIdAndUpdate(req.params.id, validatedData.data, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Failed to update post', error });
    }
}

/**
 * Delete a post.
 */
export async function deletePost(req: Request, res: Response) {
    try {
        if (!req.session || !req.session._id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const postToDelete = await PostModel.findById(req.params.id);
        if (!postToDelete) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (postToDelete.author.toString() !== req.session._id && !req.session.isAdmin) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        await PostModel.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'Post deleted' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Failed to delete post', error });
    }
}

/**
 * Create a new post with image upload.
 */
export const createPostsWithImage = (req: Request, res: Response) => {
    const bb = busboy({ headers: req.headers });

    const uploadHandler = (fieldname: string, file: NodeJS.ReadableStream, info: any) => {
        const uploadStream = getImageBucket().openUploadStream(info.filename, {
            metadata: { contentType: info.mimeType },
        });

        file.pipe(uploadStream);

        uploadStream.on('finish', async () => {
            try {
                const { title, description, projectId } = req.body;

                const newPost = new PostModel({
                    title,
                    description,
                    imageId: uploadStream.id,
                    author: req.session?._id,
                    projectId,
                });

                await newPost.save();
                res.status(201).json(newPost);
            } catch (error) {
                console.error('Error creating post:', error);
                res.status(500).json({ message: 'Failed to create post' });
            }
        });
    };

    bb.on('file', uploadHandler);
    req.pipe(bb);
};
