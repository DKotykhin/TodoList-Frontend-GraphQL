import { useQuery } from "@apollo/client";
import { GET_USER_BY_TOKEN } from "apollo/query/getUser";
import { useDispatch } from "react-redux";
import { setUser } from "store/userSlice";

export const useAuth = (): { isSuccess: boolean; isError: boolean } => {
    const dispatch = useDispatch();
    const { error, data } = useQuery(GET_USER_BY_TOKEN, {
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
