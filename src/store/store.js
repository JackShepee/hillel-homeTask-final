import { configureStore } from '@reduxjs/toolkit';
import smoothieReducer from '../slices/smoothieSlice';
import ingredientReducer from '../slices/ingredientSlice';
import orderReducer from '../slices/orderSlice';


const store = configureStore({
    reducer: {
        smoothie: smoothieReducer,
        ingredient: ingredientReducer,
        order: orderReducer,
    }
});


export default store;
