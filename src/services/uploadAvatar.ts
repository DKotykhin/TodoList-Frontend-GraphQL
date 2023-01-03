import axios from "axios";

import { getToken } from "./getToken";
import { IAvatarResponse } from "types/userTypes";

const Base_URL = process.env.REACT_APP_UPLOAD_URL;

axios.defaults.baseURL = Base_URL;

export const UploadAvatar = async (
    data: FormData
): Promise<IAvatarResponse> => {
    const config = {
        method: "POST",
        url: "/upload",
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getToken()}`,
        },
        data: data,
    };

    const result = await axios(config);
    return result.data;
};
