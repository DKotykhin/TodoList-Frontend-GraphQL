import { useDispatch } from "react-redux";

import { useQuery } from "@apollo/client";
import { GET_USER_BY_TOKEN } from "apollo/query/getUser";

import { setUser } from "store/userSlice";
import { IUser } from "types/userTypes";
import { getToken } from "services/getToken";

interface IResponse {
    getUserByToken: IUser;
}

export const useAuth = (): { isSuccess: boolean; isError: boolean } => {
    const dispatch = useDispatch();
    const { error, data } = useQuery<IResponse>(GET_USER_BY_TOKEN, {
        skip: !getToken(),
        onCompleted: (res) => {
            dispatch(setUser(res.getUserByToken));
            console.log(res.getUserByToken.message);
        },
        onError: (err) => {
            console.log(err.message);
        },
    });

    const isSuccess = !!data?.getUserByToken._id;
    const isError = !!error;

    return { isSuccess, isError };
};
