import { configureStore } from "@reduxjs/toolkit";

import query from "./querySlice";
import user from "./userSlice";

const store = configureStore({
    reducer: {
        user,
        query,
    },
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
