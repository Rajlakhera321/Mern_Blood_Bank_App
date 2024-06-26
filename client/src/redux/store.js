import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./feature/auth/authSlice";

const store = configureStore({
    reducer: {
        auth: authReducer.reducer,
    }
});

export default store;