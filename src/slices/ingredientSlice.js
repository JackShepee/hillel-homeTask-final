import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ingredients: [],
    error: null,
};

const ingredientSlice = createSlice({
    name: 'ingredient',
    initialState,
    reducers: {
        setIngredients(state, action) {
            state.ingredients = action.payload;
        },
        addIngredient(state, action) {
            state.ingredients.push(action.payload);
        },
        removeIngredient(state, action) {
            state.ingredients = state.ingredients.filter((ingredient) => ingredient.id !== action.payload);
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setIngredients, addIngredient, removeIngredient, setError } = ingredientSlice.actions;
export default ingredientSlice.reducer;
