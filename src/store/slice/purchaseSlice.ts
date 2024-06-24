import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PurchaseInterface } from "../../model/purchase";
import BASE_URL from "../../config";
import axios from "axios";

interface PurchaseListInterface {
    purchases:PurchaseInterface[];
    
}

const initialState: PurchaseListInterface = {
    purchases: [],
    
    
};
export const postPurchaseDetails = createAsyncThunk(
    'purchase/postPurchaseDetails',
    async (userData: PurchaseInterface) => {
        const response = await axios.post(`${BASE_URL}/purchase`, userData);
        return response.data;
    }
);
export const getPurchasedList = createAsyncThunk(
    'purchase/getPurchasedList',
    async (id:string) => {
        
        const response = await axios.get(`${BASE_URL}/purchase/${id}`);
       
        return response.data;
    }
);
const purchaseSlice = createSlice({
    name: 'purchase',
    initialState,
    reducers: {
        addPurchase: (state, action: PayloadAction<PurchaseInterface>) => {
            state.purchases.push(action.payload);
        },
       
    },
    extraReducers: (builder) => {
        builder.addCase(postPurchaseDetails.fulfilled, (state, action) => {
            state.purchases.push(action.payload);
        });
        builder.addCase(getPurchasedList.fulfilled, (state, action) => {
            state.purchases = action.payload;
        });
        
    },
})

export const { addPurchase } = purchaseSlice.actions;
export default purchaseSlice.reducer;