// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import themeConfigSlice from './themeConfigSlice';

// const rootReducer = combineReducers({
//     themeConfig: themeConfigSlice,
// });

// export default configureStore({
//     reducer: rootReducer,
// });

// export type IRootState = ReturnType<typeof rootReducer>;

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice'; // Keep existing slice
import userSlice from './userSlice'; // Import the new user slice

// Combine all reducers
const rootReducer = combineReducers({
    themeConfig: themeConfigSlice, // Existing theme config slice
    user: userSlice, // Add the user slice here
});

// Configure and export the Redux store
const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch; // Export the AppDispatch type
export type IRootState = ReturnType<typeof rootReducer>; // Export the RootState type

export default store;
