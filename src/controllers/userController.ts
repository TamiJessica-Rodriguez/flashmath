import axios from 'axios';

interface UserData {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    avatar: string;
}

const API_URL = 'http://localhost:3000/api/users';
const SUBMISSION_API_URL = 'http://localhost:3000/api/submissions';

/**
 * Create a new user
 */
export const createUser = async (userData: UserData) => {
    try {
        const response = await axios.post(`${API_URL}/create`, userData, {
            withCredentials: true, // Include cookies for authentication if needed
        });
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Ett nätverksfel inträffade vid skapandet av användaren');
        } else {
            throw new Error('Ett nätverksfel inträffade vid skapandet av användaren');
        }
    }
};

/**
 * Log in a user
 */
export const loginUser = async (username: string, password: string) => {
    try {
        const response = await axios.post(
            `${API_URL}/login`,
            { username, password },
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Ett nätverksfel inträffade vid inloggningen');
        } else {
            throw new Error('Ett nätverksfel inträffade vid inloggningen');
        }
    }
};

/**
 * Log out the current user
 */
export const logoutUser = async () => {
    try {
        const response = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error logging out:', error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Ett nätverksfel inträffade vid utloggningen');
        } else {
            throw new Error('Ett nätverksfel inträffade vid utloggningen');
        }
    }
};

/**
 * Fetch all users
 */
export const getUsers = async () => {
    try {
        const response = await axios.get(API_URL, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Ett nätverksfel inträffade vid hämtning av användare');
        } else {
            throw new Error('Ett nätverksfel inträffade vid hämtning av användare');
        }
    }
};

/**
 * Upload a file submission
 */
export const uploadSubmission = async (file: File, title: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    try {
        const response = await axios.post(SUBMISSION_API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading submission:', error);
        throw new Error('Ett oväntat fel inträffade vid uppladdning av inlämning.');
    }
};
