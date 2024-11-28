import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import userSlice from './userSlice'; // Importera din userSlice

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    user: userSlice, // Lägg till userSlice här
});

const store = configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
