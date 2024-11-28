// import axios from 'axios';

// interface UserData {
//     firstname: string;
//     lastname: string;
//     username: string;
//     password: string;
// }

// const API_URL = 'http://localhost:3000/api/users';

// export const createUser = async (userData: UserData) => {
//     try {
//         const response = await axios.post(`${API_URL}/create`, userData, {
//             withCredentials: true,
//         });
//         return response.data;
//     } catch (error) {
//         console.error('Error creating user:', error);
//         if (axios.isAxiosError(error)) {
//             throw new Error(error.response?.data?.message || 'Ett nätverksfel inträffade vid skapandet av användaren');
//         } else {
//             throw new Error('Ett nätverksfel inträffade vid skapandet av användaren');
//         }
//     }
// };

import axios from 'axios';

interface UserData {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
}

const API_URL = 'http://localhost:3000/api/users';

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
