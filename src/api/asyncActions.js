import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPromotions = createAsyncThunk(
    'smoothie/fetchPromotions',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:5000/smoothie");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);