import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const dotenv = require('dotenv');

dotenv.config();

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchPromotions = createAsyncThunk(
    'smoothie/fetchPromotions',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/smoothie`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchIngredients = createAsyncThunk(
    'ingredient/fetchIngredients',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/ingredient`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
