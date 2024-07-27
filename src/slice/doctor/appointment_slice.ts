// import { department_list_data } from '@/types/admin';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { toast } from 'react-toastify';

const base_url = import.meta.env.VITE_BASE_URL as string


interface doctor_appointment_list_state {
    data?: any ; 
    loading: boolean;
    error: any;
}

// First async thunk for the first slice
export const doctor_appointment_list = createAsyncThunk(
    'appointment/doctor_appointment_list',
    async (body, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${base_url}/doctor/appointment/list`, body, {withCredentials: true})
            const data = response.data

            if (!data.success) {
                throw new Error(data?.message || 'appointment not found');
            }

            return data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message || 'server error')
            return rejectWithValue(error?.response?.data?.message || error?.message || 'server error');
        }
    }
);

const initialState: doctor_appointment_list_state =
{
    data: null,
    loading: false,
    error: null,
}

const doctor_appointment_list_slice = createSlice({
    name: 'appointment',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(doctor_appointment_list.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(doctor_appointment_list.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data; // Assuming data is inside payload
            })
            .addCase(doctor_appointment_list.rejected, (state, action) => {
                state.loading = false;
                state.data = null;
                state.error = action.payload || 'Something went wrong';
            });
    },
});

export const doctor_appointment_slice = doctor_appointment_list_slice.reducer;
