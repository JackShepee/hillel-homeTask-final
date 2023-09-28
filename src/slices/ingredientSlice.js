import { createSlice } from '@reduxjs/toolkit';
import { fetchIngredients } from '../api/asyncActions';

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
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.ingredients = action.payload;
                state.loading = false;
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setIngredients, addIngredient, removeIngredient, setError } = ingredientSlice.actions;
export default ingredientSlice.reducer;
