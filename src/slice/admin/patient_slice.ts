// import { department_list_data } from '@/types/admin';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { toast } from 'react-toastify';

const base_url = import.meta.env.VITE_BASE_URL as string


interface patient_list_state {
    data?: any ; 
    loading: boolean;
    error: any;
}

// First async thunk for the first slice
export const patient_list = createAsyncThunk(
    'department/patient_list',
    async (body, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${base_url}/admin/patients/list`, body, {withCredentials: true})
            const data = response.data

            if (!data.success) {
                throw new Error(data?.message || 'patients not found');
            }

            return data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error.message || 'server error');
            return rejectWithValue(error?.response?.data?.message || error?.message || 'server error');
        }
    }
);

const initialState: patient_list_state =
{
    data: null,
    loading: false,
    error: null,
}

const patient_list_slice = createSlice({
    name: 'department',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(patient_list.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(patient_list.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data; // Assuming data is inside payload
            })
            .addCase(patient_list.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload || 'Something went wrong';
            });
    },
});

export const patients_slice = patient_list_slice.reducer;
