import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: [],
    error: null,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrders(state, action) {
            state.orders = action.payload;
        },
        addOrder(state, action) {
            state.orders.push(action.payload);
        },
        removeOrder(state, action) {
            state.orders = state.orders.filter((order) => order.id !== action.payload);
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setOrders, addOrder, removeOrder, setError } = orderSlice.actions;
export default orderSlice.reducer;
