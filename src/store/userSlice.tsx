import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser as createUserAPI } from '../controllers/userController';

interface User {
    firstname: string;
    lastname: string;
    username: string;
}

interface UserState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
};

// AsyncThunk för att skapa en användare
export const registerUser = createAsyncThunk('user/register', async (userData: { firstname: string; lastname: string; username: string; password: string }, { rejectWithValue }) => {
    try {
        const response = await createUserAPI(userData); // Använder API-anropet
        return response;
    } catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Ett fel inträffade vid registrering.');
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default userSlice.reducer;
