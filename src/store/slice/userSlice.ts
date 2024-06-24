// userSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserInterface } from '../../model/user';
import { editUserInterface } from '../../model/editUser';
import BASE_URL from '../../config';
import LoginCredentials from '../../model/authorised';

export const postUserDetails = createAsyncThunk(
    'user/postUserDetails',
    async (userData: UserInterface) => {
        const response = await axios.post(`${BASE_URL}/users`, userData);
        return response.data;
    }
);
export const fetchUserDetails = createAsyncThunk(
    'user/fetchUserDetails',
    async () => {
        const response = await axios.get(`${BASE_URL}/users`);
        return response.data;
    }
);
export const loginAuthentication = createAsyncThunk(
    'user/loginAuthentication',
    async (loginData: LoginCredentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/users/login`, loginData);
            console.log(response.data)
            return response.data;
        } catch (error: any) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    }
);
export const editSlice = createAsyncThunk(
    'user/editUserDetails',
    async (userData:editUserInterface) => {
        console.log(`line 24: ${userData._id}`)
        const response = await axios.put(`${BASE_URL}/users/${userData._id}`,userData);
        console.log(`line 26: ${response}`)
        return response.data;
    }
);
export const deleteSlice = createAsyncThunk(
    'user/deleteUserDetails',
    async (userId:string) => {
       
        const response = await axios.delete(`${BASE_URL}/users/${userId}`);
        console.log(`line 26: ${response}`)
        return response.data;
    }
);
interface UserListInterface {
    users: UserInterface[];
    
}

const initialState: UserListInterface = {
    users: [],
    
    
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<UserInterface>) => {
            state.users.push(action.payload);
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            state.users = state.users.filter((user, index) => {
                index !== action.payload
                console.log(user._id)
            });
            
        },
        viewUserList: () => {},
    },
    extraReducers: (builder) => {
        builder.addCase(postUserDetails.fulfilled, (state, action) => {
            state.users.push(action.payload);
        });
        builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
            state.users = action.payload;
        });
        builder.addCase(editSlice.fulfilled, (state, action) => {
            state.users = action.payload;
        });
        builder.addCase(deleteSlice.fulfilled, (state, action) => {
            state.users = action.payload;
        });
        builder.addCase(loginAuthentication.fulfilled, (state, action) => {
            state.users = action.payload
            
           
        });
    },
});

export const { addUser, deleteUser, viewUserList } = userSlice.actions;
export default userSlice.reducer;
