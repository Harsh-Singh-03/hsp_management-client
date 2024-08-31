// import { department_list_data } from '@/types/admin';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { toast } from 'react-toastify';

const base_url = import.meta.env.VITE_BASE_URL as string


interface overview_slice_state {
    data?: any ; 
    loading: boolean;
    error: any;
}

// First async thunk for the first slice
export const overview_count = createAsyncThunk(
    'admin/overview_count',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${base_url}/admin/overview_count`, {withCredentials: true})
            const data = response.data

            if (!data.success) {
                throw new Error(data?.message || 'doctors not found');
            }

            return data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || 'server error')
            return rejectWithValue(error?.response?.data?.message || error?.message || 'server error');
        }
    }
);

const initialState: overview_slice_state =
{
    data: null,
    loading: false,
    error: null,
}

const overview_count_slice = createSlice({
    name: 'admin',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(overview_count.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(overview_count.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data; // Assuming data is inside payload
            })
            .addCase(overview_count.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload || 'Something went wrong';
            });
    },
});

export const admin_overview_count = overview_count_slice.reducer;
