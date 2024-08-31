// import { department_list_data } from '@/types/admin';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { toast } from 'react-toastify';

const base_url = import.meta.env.VITE_BASE_URL as string


interface doctor_analytics_state {
    data?: any ; 
    loading: boolean;
    error: any;
}

// First async thunk for the first slice
export const doctor_analytics = createAsyncThunk(
    'appointment/doctor_analytics',
    async (body, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${base_url}/doctor/analytics`, {withCredentials: true})
            const data = response.data

            if (!data.success) {
                throw new Error(data?.message || 'no result found');
            }

            return data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || 'server error')
            return rejectWithValue(error?.response?.data?.message || error?.message || 'server error');
        }
    }
);

const initialState: doctor_analytics_state =
{
    data: null,
    loading: false,
    error: null,
}

const doctor_analytics_slice1 = createSlice({
    name: 'analytics',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(doctor_analytics.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(doctor_analytics.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data; // Assuming data is inside payload
            })
            .addCase(doctor_analytics.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload || 'Something went wrong';
            });
    },
});

export const doctor_analytics_slice = doctor_analytics_slice1.reducer;
