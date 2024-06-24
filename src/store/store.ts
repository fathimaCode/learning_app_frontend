// store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import purchaseReducer from './slice/purchaseSlice'
import trackReducer from './slice/trackSlice'
import messageReducer from './slice/messageSlice'
const store = configureStore({
    reducer: {
        user: userReducer,
        purchase:purchaseReducer,
        track:trackReducer,
        chats:messageReducer
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
