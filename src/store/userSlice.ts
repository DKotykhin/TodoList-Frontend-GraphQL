import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./reduxHooks";

import { IUser } from "types/userTypes";

const initialState: IUser = {
    _id: "",
    email: "",
    name: "",
    createdAt: "",
    avatarURL: "",
    message: ""
};

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: () => initialState,
        setUser: (state, action: PayloadAction<IUser>) => {
            state.name = action.payload.name;
            state.avatarURL = action.payload.avatarURL;
        },        
    },
});

const { actions, reducer } = UserSlice;

export default reducer;
export const { setUser, logout } = actions;

export const userSelector = (state: RootState) => state.user;
