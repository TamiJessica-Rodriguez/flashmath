import busboy from 'busboy';
import { Request, Response } from 'express';
import { Types } from 'mongoose';
import sharp from 'sharp';
import { PostModel } from '../posts/post-model';
import { getImageBucket } from './images-model';

export const getImage = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = new Types.ObjectId(req.params.id);
        const imageBucket = getImageBucket();

        const imageData = await imageBucket.find({ _id: id }).next();
        if (!imageData) {
            res.status(404).json({ message: 'Image does not exist' });
            return;
        }

        res.setHeader('Content-Type', imageData.metadata?.contentType);

        imageBucket.openDownloadStream(id).pipe(res);
    } catch (error) {
        console.error('Error fetching image:', error);
        res.status(500).json({ message: 'Error fetching image', error: (error as Error).message });
    }
};

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
    const bb = busboy({ headers: req.headers });

    bb.on('file', (fieldname, file, info) => {
        console.log(`Receiving file with field name: ${fieldname}`);

        const supportedMimeTypes = ['image/png', 'image/jpeg', 'image/webp'];
        if (!supportedMimeTypes.includes(info.mimeType)) {
            res.status(400).json({ message: 'Unsupported image format. Only PNG, JPEG, and WEBP are allowed.' });
            return;
        }

        const metadata = {
            contentType: info.mimeType,
            uploadedBy: req.user?.id, // Linking the upload to the user
        };

        const uploadStream = getImageBucket().openUploadStream(info.filename, { metadata });

        const transformer = sharp()
            .resize({ width: 100, height: 100, fit: 'cover' })
            .on('error', (err) => {
                console.error('Sharp error:', err);
                res.status(500).json({ message: 'Error processing image', error: err.message });
            });

        file.pipe(transformer).pipe(uploadStream);

        uploadStream.on('finish', () => {
            res.status(201).json({ imageId: uploadStream.id });
        });

        uploadStream.on('error', (err) => {
            console.error('Upload error:', err);
            res.status(500).json({ message: 'Error uploading file', error: err.message });
        });
    });

    bb.on('error', (err) => {
        console.error('Busboy error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        res.status(500).json({ message: 'Error processing upload', error: errorMessage });
    });

    req.pipe(bb);
};

export const createPostsWithImage = async (req: Request, res: Response) => {
    try {
        const { title, content, size, color, brand, imageUrl } = req.body;

        // Skapa en ny post kopplad till användaren
        const newPost = new PostModel({
            title,
            content,
            size,
            color,
            brand,
            imageUrl,
            author: req.user?.id, // Kopplar posten till användaren
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Failed to create post' });
    }
};
