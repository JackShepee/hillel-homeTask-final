import { createSlice } from '@reduxjs/toolkit';
import { fetchPromotions } from '../api/asyncActions';

const initialState = {
    smoothies: [],
    promotions: [],
    loading: false,
    error: null,
};

const smoothieSlice = createSlice({
    name: 'smoothie',
    initialState,
    reducers: {
        setSmoothies(state, action) {
            state.smoothies = action.payload;
        },
        startLoading: (state) => {
            state.loading = true;
        },
        endLoading: (state) => {
            state.loading = false;
        },
        setPromotions: (state, action) => {
            state.promotions = action.payload;
        },
        addToCart(state, action) {
            state.cart.push(action.payload);
        },
        removeFromCart(state, action) {
            state.cart = state.cart.filter((item, index) => index !== action.payload);
        },
        clearCart(state) {
            state.cart = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPromotions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPromotions.fulfilled, (state, action) => {
                state.promotions = action.payload;
                state.loading = false;
            })
            .addCase(fetchPromotions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setSmoothies, addToCart, removeFromCart, clearCart, startLoading, endLoading, setPromotions } = smoothieSlice.actions;
export default smoothieSlice.reducer;
