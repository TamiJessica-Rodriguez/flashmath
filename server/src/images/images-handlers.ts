import busboy from 'busboy';
import { Request, Response } from 'express';
import { Types } from 'mongoose';
import sharp from 'sharp';
import { PostModel } from '../posts/post-model'; // Importera din postmodell
import { getImageBucket } from './images-model';

export const getImage = async (req: Request, res: Response) => {
    const id = new Types.ObjectId(req.params.id);
    const imageBucket = getImageBucket();

    // Hämta bildens metadata så att vi kan sätta content-type till rätt värde.
    const imageData = await imageBucket.find({ _id: id }).next();
    if (!imageData) return res.status(404).json('Image does not exist');
    res.setHeader('Content-Type', imageData.metadata?.contentType);

    // Skicka bilden som ett svar till klienten
    imageBucket.openDownloadStream(id).pipe(res);
};

export const uploadImage = (req: Request, res: Response) => {
    const bb = busboy({ headers: req.headers });

    bb.on('file', (fieldname, file, info) => {
        console.log(`Receiving file with field name: ${fieldname}`);
        console.log(`File MIME type: ${info.mimeType}`);
        console.log(`File name: ${info.filename}`);

        if (info.mimeType !== 'image/png' && info.mimeType !== 'image/jpeg') {
            return res.status(400).json({ message: 'Unsupported image format. Only PNG and JPEG are allowed.' });
        }

        const uploadStream = getImageBucket().openUploadStream(info.filename, {
            metadata: { contentType: info.mimeType },
        });

        const transformer = sharp()
            .resize({
                width: 100,
                height: 100,
                fit: 'cover',
            })
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
        // Skapa en ny post i databasen med bildens URL
        const newPost = new PostModel({
            title,
            content,
            size,
            color,
            brand,
            imageUrl,
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Failed to create post' });
    }
};
