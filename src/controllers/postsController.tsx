import axios from 'axios';

const POSTS_API_URL = 'http://localhost:3000/api/posts';
const IMAGES_API_URL = 'http://localhost:3000/api/images';

/**
 * Upload an image and return its ID
 */
export const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(IMAGES_API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true, // Optional if authentication is required
        });
        return response.data.imageId; // Assuming the backend returns the imageId
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Failed to upload image');
    }
};

/**
 * Create a new post with title, description, and optional image ID
 */
export const createPost = async (postData: { title: string; description: string; imageId?: string }) => {
    try {
        const response = await axios.post(POSTS_API_URL, postData, {
            withCredentials: true, // Optional if authentication is required
        });
        return response.data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw new Error('Failed to create post');
    }
};
