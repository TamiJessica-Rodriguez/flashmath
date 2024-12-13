import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { z } from 'zod';
import { PostModel, PostZodSchema } from './post-model';

/**
 * Logga varje steg för att identifiera var felet inträffar.
 */

// Hämta alla poster
export async function getPosts(req: Request, res: Response) {
    try {
        console.log('Fetching all posts...');
        const posts = await PostModel.find({});
        console.log('Posts retrieved successfully:', posts);
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Failed to fetch posts', error });
    }
}

// Skapa en ny post
export const createPosts = async (req: Request, res: Response) => {
    try {
        console.log('Request body:', req.body);

        const { title, description, imageId, projectId } = req.body;

        console.log('Validating request data with Zod...');
        const validatedData = PostZodSchema.parse({
            title,
            description,
            imageId,
            author: req.session?._id,
            projectId,
        });

        console.log('Validated data:', validatedData);

        const validImageId = mongoose.isValidObjectId(validatedData.imageId) ? validatedData.imageId : undefined;

        const newPost = new PostModel({
            ...validatedData,
            imageId: validImageId,
        });

        console.log('Saving new post to the database...');
        await newPost.save();

        console.log('Post created successfully:', newPost);
        res.status(201).json(newPost);
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation error:', error.errors);
            res.status(400).json({ message: 'Validation failed', errors: error.errors });
        } else {
            console.error('Error creating post:', error);
            res.status(500).json({ message: 'Failed to create post', error });
        }
    }
};

// Uppdatera en post
export async function updatePost(req: Request, res: Response) {
    try {
        console.log('Checking user session...');
        if (!req.session || !req.session._id) {
            console.warn('Unauthorized request: No user session found.');
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const postId = req.params.id;
        console.log(`Finding post with ID: ${postId}...`);
        const postToUpdate = await PostModel.findById(postId);

        if (!postToUpdate) {
            console.warn(`Post with ID ${postId} not found.`);
            return res.status(404).json({ message: `Post with ID ${postId} not found` });
        }

        console.log('Validating user permissions...');
        if (postToUpdate.author.toString() !== req.session._id && !req.session.isAdmin) {
            console.warn('User does not have permission to update this post.');
            return res.status(403).json({ message: 'Forbidden' });
        }

        console.log('Validating request data with Zod...');
        const validatedData = PostZodSchema.safeParse(req.body);

        if (!validatedData.success) {
            console.error('Validation failed:', validatedData.error.errors);
            return res.status(400).json(validatedData.error.errors);
        }

        console.log('Updating post in the database...');
        const updatedPost = await PostModel.findByIdAndUpdate(postId, validatedData.data, { new: true });

        if (!updatedPost) {
            console.warn(`Post with ID ${postId} not found after update.`);
            return res.status(404).json({ message: `Post with ID ${postId} not found` });
        }

        console.log('Post updated successfully:', updatedPost);
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Failed to update post', error });
    }
}

// Radera en post
export async function deletePost(req: Request, res: Response) {
    try {
        if (!req.session) {
            console.warn('Unauthorized request: No user session found.');
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const postId = req.params.id;
        console.log(`Finding post with ID: ${postId} to delete...`);
        const postToDelete = await PostModel.findById(postId);

        if (!postToDelete) {
            console.warn(`Post with ID ${postId} not found.`);
            return res.status(404).json({ message: `Post with ID ${postId} not found` });
        }

        console.log('Validating user permissions...');
        if (!req.session.isAdmin && postToDelete.author.toString() !== req.session._id) {
            console.warn('User does not have permission to delete this post.');
            return res.status(403).json({ message: 'Forbidden' });
        }

        console.log('Deleting post from the database...');
        await PostModel.findByIdAndDelete(postId);

        console.log('Post deleted successfully.');
        res.status(204).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Failed to delete post', error });
    }
}
