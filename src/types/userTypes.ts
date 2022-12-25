export interface IUserLogin {    
    email: string;
    password: string;    
}

export interface IUserRegister extends IUserLogin {
    name: string    
}

export interface IUserUpdate {    
    [key: string]: string;    
}

export interface IUser {    
    _id: string;
    email: string;
    name: string;
    createdAt: string; 
    avatarURL: string;    
}

export interface IuserWithToken extends IUser {
    token: string
}

export interface RequestError {
    status: number;
    data: {
        message: string;
    }
}