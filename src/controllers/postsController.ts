// post-api.ts
import axiosInstance from './axios-config';

/**
 * Ladda upp en bild och returnera dess ID
 */
export const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axiosInstance.post('/images', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.imageId; // Returnera bildens ID
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Failed to upload image');
    }
};

/**
 * Skapa ett nytt inlägg
 */
export const createPost = async (postData: { title: string; description: string; imageId?: string; projectId: number }) => {
    try {
        const response = await axiosInstance.post('/posts', postData);
        return response.data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw new Error('Failed to create post');
    }
};

/**
 * Hämta alla inlägg
 */
export const fetchPosts = async () => {
    try {
        const response = await axiosInstance.get('/posts');
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Failed to fetch posts');
    }
};

/**
 * Uppdatera ett inlägg
 */
export const updatePost = async (postId: string, updateData: { title: string; description: string; imageId?: string; projectId: number }) => {
    try {
        const response = await axiosInstance.put(`/posts/${postId}`, updateData);
        return response.data;
    } catch (error) {
        console.error(`Error updating post with ID ${postId}:`, error);
        throw new Error('Failed to update post');
    }
};

/**
 * Ta bort ett inlägg
 */
export const deletePost = async (postId: string) => {
    try {
        const response = await axiosInstance.delete(`/posts/${postId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting post with ID ${postId}:`, error);
        throw new Error('Failed to delete post');
    }
};
