// import { department_list_data } from '@/types/admin';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const base_url = import.meta.env.VITE_BASE_URL as string


interface appointment_list_state {
    data?: any ; 
    loading: boolean;
    error: any;
}

// First async thunk for the first slice
export const appointment_list = createAsyncThunk(
    'appointment/appointment_list',
    async (body, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${base_url}/admin/appointment/list`, body, {withCredentials: true})
            const data = response.data

            if (!data.success) {
                throw new Error(data?.message || 'appointment not found');
            }

            return data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || error?.message || 'server error');
        }
    }
);

const initialState: appointment_list_state =
{
    data: null,
    loading: false,
    error: null,
}

const appointment_list_slice = createSlice({
    name: 'appointment',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(appointment_list.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(appointment_list.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data; // Assuming data is inside payload
            })
            .addCase(appointment_list.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload || 'Something went wrong';
            });
    },
});

export const appointment_slice = appointment_list_slice.reducer;
