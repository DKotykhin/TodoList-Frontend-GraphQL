import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserAvatarResponse } from "types/responseTypes";
import { IUser } from "types/userTypes";

const initialState: IUser = {
    _id: "",
    email: "",
    name: "",
    createdAt: "",
    avatarURL: "",
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
        updateAvatarURL: (
            state,
            action: PayloadAction<IUserAvatarResponse>
        ) => {
            state.avatarURL = action.payload.avatarURL;
        },
    },
});

const { actions, reducer } = UserSlice;

export default reducer;
export const { setUser, updateAvatarURL, logout } = actions;
