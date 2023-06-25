import { DocumentNode, gql } from "@apollo/client";

export const USER_REGISTER: DocumentNode = gql`
    mutation ($query: UserRegisterInput) {
        userRegister(registerInput: $query) {
            _id
            email
            name
            avatarURL
            createdAt
            token
            message
        }
    }
`;

export const USER_UPDATE_NAME: DocumentNode = gql`
    mutation ($name: String!) {
        userUpdateName(name: $name) {
            _id
            name
            email
            avatarURL
            createdAt
            message
        }
    }
`;

export const USER_CONFIRM_PASSWORD: DocumentNode = gql`
    mutation ($password: String!) {
        userConfirmPassword(password: $password) {
            status
            message
        }
    }
`;

export const USER_UPDATE_PASSWORD: DocumentNode = gql`
    mutation ($password: String!) {
        userUpdatePassword(password: $password) {
            status
            message
        }
    }
`;

export const USER_RESET_PASSWORD: DocumentNode = gql`
    mutation UserResetPassword($email: String!) {
        userResetPassword(email: $email) {
            status
            message
        }
    }
`;

export const USER_SET_NEW_PASSWORD: DocumentNode = gql`
    mutation UserSetNewPassword($query: UserSetPasswordInput) {
        userSetNewPassword(setPasswordInput: $query) {
            status
            message
        }
    }
`;

export const DELETE_USER: DocumentNode = gql`
    mutation ($_id: ID!) {
        userDelete(_id: $_id) {
            taskStatus {
                acknowledged
                deletedCount
            }
            userStatus {
                acknowledged
                deletedCount
            }
            message
        }
    }
`;

export const USER_UPLOAD_AVATAR_URL: DocumentNode = gql`
    mutation ($avatarURL: String!) {
        uploadAvatar(avatarURL: $avatarURL) {
            avatarURL
            message
        }
    }
`;

export const DELETE_AVATAR: DocumentNode = gql`
    mutation ($_id: ID!) {
        deleteAvatar(_id: $_id) {
            avatarURL
            message
        }
    }
`;
