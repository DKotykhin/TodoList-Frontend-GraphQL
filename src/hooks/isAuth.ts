import { useFetchUserByTokenQuery } from "services/userServices";

export const useAuth = (): { isSuccess: boolean; isError: boolean } => {
    const { isSuccess, isError } = useFetchUserByTokenQuery();

    return { isSuccess, isError };
};
