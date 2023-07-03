export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserRegister extends IUserLogin {
    name: string;
}

export interface IUserUpdate {
    [key: string]: string;
}

export interface IUserProfileForm {
    email: string;
    name: string;
}

export interface IUser {
    _id: string;
    email: string;
    name: string;
    createdAt: string;
    avatarURL: string;
    message: string;
}

export interface IUserWithToken extends IUser {
    token: string;    
}

export interface IPasswordResponse {
    status: boolean;
    message: string;
}

export interface IResetPasswordResponse {
    status: string;
    message: string;
}

export interface IAvatarResponse {
    avatarURL: string;
    message: string;
}

export interface IUserDeleteResponse {
    taskStatus: {
        acknowledged: boolean;
        deletedCount: number;
    };
    userStatus: {
        acknowledged: boolean;
        deletedCount: number;
    };
    message: string;
}
