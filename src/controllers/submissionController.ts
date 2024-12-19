import axiosInstance from './axios-config';

/**
 * Ladda upp en inlämning
 */
export const uploadSubmission = async (file: File, title: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    try {
        const response = await axiosInstance.post('/submissions', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading submission:', error);
        throw new Error('Failed to upload submission');
    }
};
