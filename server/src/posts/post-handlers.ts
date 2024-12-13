import busboy from 'busboy';
import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import { getImageBucket } from '../images/images-model';
import { PostModel, PostZodSchema } from './post-model';

/**
 * Get all post from database
 */
export async function getPosts(req: Request, res: Response) {
    const posts = await PostModel.find({});
    res.status(200).json(posts);
}

/**
 * Create new post with validation from zodschema and save to database
 */
export const createPosts = async (req: Request, res: Response) => {
    try {
        const { title, description, imageId } = req.body;

        // Kontrollera att `imageId` är giltigt, eller lämna det som undefined
        const validImageId = mongoose.isValidObjectId(imageId) ? imageId : undefined;

        const newPost = new PostModel({
            title,
            description,
            imageId: validImageId,
            author: req.session ? req.session._id : undefined, // Antag att användaren är inloggad
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Failed to create post', error });
    }
};

export async function updatePost(req: Request, res: Response) {
    try {
        // Dubbelkolla om användaren är inloggad
        if (!req.session || !req.session._id) {
            return res.status(401).json({ message: 'Obehörig' });
        }

        // Hitta inlägget som ska uppdateras
        const postToUpdate = await PostModel.findById(req.params.id);

        // Kontrollera om inlägget existerar
        if (!postToUpdate) {
            return res.status(404).json(`Inlägg med id: ${req.params.id} hittades inte`);
        }

        // Kontrollera om användaren är författaren eller en administratör
        if (!postToUpdate.author || (postToUpdate.author.toString() !== req.session._id && !req.session.isAdmin)) {
            return res.status(403).json(`Endast författaren eller administratörer kan uppdatera detta inlägg`);
        }

        // Validera inkommande data med Zod
        const validatedData = PostZodSchema.safeParse(req.body);

        // Kontrollera om valideringen misslyckades
        if (!validatedData.success) {
            return res.status(400).json(validatedData.error.message);
        }

        // Uppdatera inlägget i databasen
        const updatedPost = await PostModel.findByIdAndUpdate(req.params.id, { ...validatedData.data }, { new: true });

        if (!updatedPost) {
            return res.status(404).json(`Inlägg med id: ${req.params.id} hittades inte`);
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Fel vid uppdatering av inlägg', error });
    }
}

export async function deletePost(req: Request, res: Response) {
    try {
        if (!req.session) {
            return res.status(401).json('Obehörig');
        }
        const postId = req.params.id;

        const postToDelete = await PostModel.findById(postId);

        // Kontrollera om inlägget existerar
        if (!postToDelete) {
            return res.status(404).json(`Inlägg med id: ${postId} hittades inte`);
        }

        // Kontrollera om användaren är administratör eller författaren till inlägget
        if (!req.session.isAdmin && postToDelete.author?.toString() !== req.session._id) {
            return res.status(403).json('Endast administratörer eller författaren kan ta bort detta inlägg');
        }

        await PostModel.findByIdAndDelete(postId);

        res.status(204).json('Inlägget har tagits bort');
    } catch (error) {
        console.error('Fel vid borttagning av inlägg:', error);
        res.status(500).json('Fel vid borttagning av inlägg');
    }
}

/**
 * Get a post with id
 */
export async function getPostById(req: Request, res: Response) {
    try {
        const post = await PostModel.findById(req.params.id);
        if (post) {
            return res.status(200).json(post);
        } else {
            return res.status(404).json(`Post with id ${req.params.id} was not found`);
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving the post', error: error });
    }
}

/**
 * Get all post from a user
 */
export async function getPostsByUserId(req: Request, res: Response) {
    try {
        const userId = req.params.id;
        console.log(req.params);
        console.log(`Fetching posts for user ID: ${userId}`);
        const posts = await PostModel.find({ author: userId });
        console.log(`Found ${posts.length} posts`);

        if (posts.length === 0) {
            return res.status(404).json({ message: 'No posts found for this user' });
        }
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error retrieving posts:', error);
        res.status(500).json({ message: 'Error retrieving posts', error: error });
    }
}

export const createPostsWithImage = (req: Request, res: Response) => {
    const bb = busboy({ headers: req.headers });

    const uploadHandler = (fieldname: string, file: NodeJS.ReadableStream, info: any) => {
        const uploadStream = getImageBucket().openUploadStream(info.filename, {
            metadata: {
                contentType: info.mimeType,
            },
        });

        file.pipe(uploadStream);

        uploadStream.on('finish', async () => {
            try {
                const { title, description } = req.body;

                const newPost = new PostModel({
                    title,
                    description,
                    imageId: uploadStream.id, // Koppla bildens ID till posten
                    author: req.session ? req.session._id : undefined,
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
