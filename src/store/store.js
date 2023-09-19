import { configureStore } from '@reduxjs/toolkit';
import smoothieReducer from '../slices/smoothieSlice';

const store = configureStore({
    reducer: {
        smoothie: smoothieReducer,
    },
});

export default store;
