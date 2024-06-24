import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import BASE_URL from "../../config";
import axios from "axios";
import { chatsInterface } from "../../model/chatsInterface";


interface chatsListInterface {
   
    chats:chatsInterface[];
    
}

const initialState: chatsListInterface = {
    chats: [],
    
    
};
export const postToMessage = createAsyncThunk(
    'chat/postMessage',
    async (userData: chatsInterface) => {
        const response = await axios.post(`${BASE_URL}/message`, userData);
        return response.data;
    }
);
export const getAllMessage = createAsyncThunk(
    'chat/getAllMessage',
    async () => {
        
        const response = await axios.get(`${BASE_URL}/message`);
       
        return response.data;
    }
);
export const getMessageList = createAsyncThunk(
    'chat/getMessageList',
    async (id:string) => {
        
        const response = await axios.get(`${BASE_URL}/message/${id}`);
       
        return response.data;
    }
);
const chatSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        addChat: (state, action: PayloadAction<chatsInterface>) => {
            state.chats.push(action.payload);
        },
       
    },
    extraReducers: (builder) => {
        builder.addCase(postToMessage.fulfilled, (state, action) => {
            state.chats.push(action.payload);
        });
        builder.addCase(getMessageList.fulfilled, (state, action) => {
            state.chats = action.payload;
        });
        builder.addCase(getAllMessage.fulfilled, (state, action) => {
            state.chats = action.payload;
        });
        
    },
})

export const { addChat } = chatSlice.actions;
export default chatSlice.reducer;