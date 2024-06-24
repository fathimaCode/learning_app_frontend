import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BASE_URL from "../../config";
import axios from "axios";
import { TrackInterface } from "../../model/track";
import { TrackDetails } from "../../model/track_details";

interface TrackListInterface {
    percentage?: string,
    tracks: TrackInterface[];
}

const initialState: TrackListInterface = {
    tracks: [],
    percentage: "",
};

export const postTrackDetails = createAsyncThunk(
    'track/postTrackDetails',
    async (userData: TrackInterface) => {
        const response = await axios.post(`${BASE_URL}/track`, userData);
        return response.data;
    }
);

export const getTrackList = createAsyncThunk(
    'track/getTrackList',
    async (trackDetail: TrackDetails) => {
        const response = await axios.post(`${BASE_URL}/track/track_details`, trackDetail);
        console.log(`line 30: ${response.data}`);
        

        // Retrieve the last element in the array
        const lastElement = response.data[response.data.length - 1];

        // Display the last element
        console.log('Last element in the array:', lastElement);
        console.log('Last element in the array:', lastElement.percentage);
        return lastElement;
    }
);

const trackSlice = createSlice({
    name: 'track',
    initialState,
    reducers: {
        addPurchase: (state, action: PayloadAction<TrackInterface>) => {
            state.tracks.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(postTrackDetails.fulfilled, (state, action) => {
            state.tracks.push(action.payload);
        });
        builder.addCase(getTrackList.fulfilled, (state, action) => {
            // Ensure that tracks remain an array
            if (Array.isArray(action.payload)) {
                state.tracks = action.payload;
            } else {
                state.tracks = [action.payload];
            }
            state.percentage = action.payload.percentage;
            console.log(state.percentage);
        });
    },
});

export const { addPurchase } = trackSlice.actions;
export default trackSlice.reducer;
