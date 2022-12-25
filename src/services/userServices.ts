import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getToken } from "./getToken";
import { setUserAvatar, updateAvatar } from "store/userSlice";
import { IUserLogin, IUserRegister, IUserUpdate } from "types/userTypes";
import {
    IUserAvatarResponse,
    IUserConfirmPasswordResponse,
    IUserDeleteResponse,
    IUserResponse,
    IUserWithoutTokenResponse,
} from "types/responseTypes";

const Base_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchUser = createApi({
    reducerPath: "fetchUser",
    baseQuery: fetchBaseQuery({ baseUrl: Base_URL }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        fetchUserByToken: builder.query<IUserWithoutTokenResponse, void>({
            query: () => ({
                url: "/user/me",
                headers: { Authorization: `Bearer ${getToken()}` },
            }),
            providesTags: ["User"],
        }),
        fetchRegisterUser: builder.mutation<IUserResponse, IUserRegister>({
            query: (data) => ({
                url: "/user/register",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUserAvatar(data));
                } catch (error) {}
            },
            invalidatesTags: ["User"],
        }),
        fetchLoginUser: builder.mutation<IUserResponse, IUserLogin>({
            query: (data) => ({
                url: "/user/login",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUserAvatar(data));
                } catch (error) {}
            },
            invalidatesTags: ["User"],
        }),
        fetchUpdateUser: builder.mutation<IUserResponse, IUserUpdate>({
            query: (data) => ({
                method: "PATCH",
                url: "/user/me",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify(data),
            }),
            invalidatesTags: ["User"],
        }),
        fetchDeleteUser: builder.mutation<IUserDeleteResponse, void>({
            query: () => ({
                method: "DELETE",
                url: "/user/me",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            }),
        }),
        fetchUserConfirmPassword: builder.mutation<
            IUserConfirmPasswordResponse,
            { password: string }
        >({
            query: (data) => ({
                method: "POST",
                url: "/user/password",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify(data),
            }),
        }),
        fetchUploadAvatar: builder.mutation<IUserAvatarResponse, FormData>({
            query: (data) => ({
                method: "POST",
                url: "/upload",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
                body: data,
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(updateAvatar(data));
                } catch (error) {}
            },
            invalidatesTags: ["User"],
        }),
        fetchDeleteAvatar: builder.mutation<IUserAvatarResponse, void>({
            query: () => ({
                method: "DELETE",
                url: "/upload",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(updateAvatar(data));
                } catch (error) {}
            },
            invalidatesTags: ["User"],
        }),
    }),
});

export const {
    useFetchUserByTokenQuery,
    useFetchLoginUserMutation,
    useFetchUpdateUserMutation,
    useFetchDeleteAvatarMutation,
    useFetchDeleteUserMutation,
    useFetchRegisterUserMutation,
    useFetchUploadAvatarMutation,
    useFetchUserConfirmPasswordMutation,
} = fetchUser;
