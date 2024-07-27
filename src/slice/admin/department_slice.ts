import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { toast } from 'react-toastify';

const base_url = import.meta.env.VITE_BASE_URL as string


interface DepartmentState {
    data?: any[] | null ; 
    loading: boolean;
    error: any;
}

// First async thunk for the first slice
export const dep_list = createAsyncThunk(
    'department/dep_list',
    async (body, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${base_url}/department/list`, body, {withCredentials: true})
            const data = response.data

            if (!data.success) {
                toast.warn(data.message)
                // throw new Error(data?.message || 'department not found');
            }

            return data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || 'server error')
            return rejectWithValue(error?.response?.data?.message || error?.message || 'server error');
        }
    }
);

const initialState: DepartmentState =
{
    data: null,
    loading: false,
    error: null,
}

const departmentSlice = createSlice({
    name: 'department',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(dep_list.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(dep_list.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data; // Assuming data is inside payload
            })
            .addCase(dep_list.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload || 'Something went wrong';
            });
    },
});

// Export the reducers to combine in the store
export const department_slice = departmentSlice.reducer;
