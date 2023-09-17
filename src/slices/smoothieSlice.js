import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    smoothies: [],
    cart: [],
    promotions: [],
};

const smoothieSlice = createSlice({
    name: 'smoothie',
    initialState,
    reducers: {
        setSmoothies(state, action) {
            state.smoothies = action.payload;
        },
        setPromotions(state, action) {
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
});

export const {
    setSmoothies,
    setPromotions,
    addToCart,
    removeFromCart,
    clearCart,
} = smoothieSlice.actions;

export default smoothieSlice.reducer;
