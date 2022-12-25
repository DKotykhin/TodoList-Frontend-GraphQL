import { configureStore } from "@reduxjs/toolkit";

import { fetchUser } from "services/userServices";
import { fetchTask } from "services/taskServices";
import { setupListeners } from "@reduxjs/toolkit/query";
import user from './userSlice';
import query from './querySlice';

const store = configureStore({
    reducer: {
        user,
        query,                    
        [fetchUser.reducerPath]: fetchUser.reducer,
        [fetchTask.reducerPath]: fetchTask.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            fetchUser.middleware,
            fetchTask.middleware
        ),
});

setupListeners(store.dispatch);

export default store;
