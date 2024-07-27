// import { department_list_data } from '@/types/admin';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const base_url = import.meta.env.VITE_BASE_URL as string


interface CredentialState {
    data?: any ; 
    isLoggedIn: boolean;
    loading: boolean;
    message: any;
}

// First async thunk for the first slice
export const validate_admin = createAsyncThunk(
    'department/validate_admin',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${base_url}/admin/validate`, {} , {withCredentials: true})
            const data = response.data

            if (!data.success) {
                throw new Error(data?.message || 'department not found');
            }

            return data;
        } catch (error: any) {
            return rejectWithValue(error?.response?.data?.message || 'server error');
        }
    }
);

const initialState: CredentialState =
{
    data: null,
    isLoggedIn: false,
    loading: true,
    message: null,
}

const admin_credential_slice = createSlice({
    name: 'department',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(validate_admin.pending, (state) => {
                state.loading = true;
                state.message = null;
            })
            .addCase(validate_admin.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data; // Assuming data is inside payload
                state.isLoggedIn = action.payload.success;
                state.message = action.payload.message;
            })
            .addCase(validate_admin.rejected, (state, action) => {
                state.loading = false;
                state.message = action.payload || 'Something went wrong';
                state.isLoggedIn = false;
            });
    },
});

// Export the reducers to combine in the store
export const admin_credentials = admin_credential_slice.reducer;
