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
        console.log('Image uploaded successfully:', response.data);
        return response.data.imageId; // Returnera bildens ID
    } catch (error: any) {
        console.error('Error uploading image:', error.response || error.message || error);
        throw new Error(error.response?.data?.message || 'Failed to upload image');
    }
};

/**
 * Skapa ett nytt inlägg
 */
export const createPost = async (postData: { title: string; description: string; imageId?: string; projectId: number }) => {
    try {
        const response = await axiosInstance.post('/posts', postData);
        console.log('Post created successfully:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Error creating post:', error.response || error.message || error);
        throw new Error(error.response?.data?.message || 'Failed to create post');
    }
};

/**
 * Hämta alla inlägg
 */
export const fetchPosts = async () => {
    try {
        const response = await axiosInstance.get('/posts');
        console.log('Posts fetched successfully:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching posts:', error.response || error.message || error);
        throw new Error(error.response?.data?.message || 'Failed to fetch posts');
    }
};

/**
 * Uppdatera ett inlägg
 */
export const updatePost = async (postId: string, updateData: { title: string; description: string; imageId?: string; projectId: number }) => {
    try {
        const response = await axiosInstance.put(`/posts/${postId}`, updateData);
        console.log(`Post with ID ${postId} updated successfully:`, response.data);
        return response.data;
    } catch (error: any) {
        console.error(`Error updating post with ID ${postId}:`, error.response || error.message || error);
        throw new Error(error.response?.data?.message || `Failed to update post with ID ${postId}`);
    }
};

/**
 * Ta bort ett inlägg
 */
export const deletePost = async (postId: string) => {
    try {
        const response = await axiosInstance.delete(`/posts/${postId}`);
        console.log(`Post with ID ${postId} deleted successfully:`, response.data);
        return response.data;
    } catch (error: any) {
        console.error(`Error deleting post with ID ${postId}:`, error.response || error.message || error);
        throw new Error(error.response?.data?.message || `Failed to delete post with ID ${postId}`);
    }
};
