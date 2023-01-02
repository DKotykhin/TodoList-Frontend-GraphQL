import { DocumentNode, gql } from "@apollo/client";

export const USER_REGISTER: DocumentNode = gql`
    mutation ($query: UserRegisterInput) {
        userRegister(registerInput: $query) {
            _id
            name
            email
            avatarURL
            createdAt
            token
            message
        }
    }
`;

export const USER_UPDATE_NAME: DocumentNode = gql`
    mutation ($query: UserNameInput) {
        userUpdateName(nameInput: $query) {
            _id
            name
            email
            avatarURL
            createdAt
            message
        }
    }
`;

export const DELETE_USER: DocumentNode = gql`
    mutation ($query: UserDeleteInput) {
        userDelete(deleteInput: $query) {
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
    mutation ($query: UserAvatarInput) {
        uploadAvatar(uploadAvatarInput: $query) {
            avatarURL
            message
        }
    }
`;

export const DELETE_AVATAR: DocumentNode = gql`
    mutation ($query: UserDeleteInput) {
        deleteAvatar(deleteAvatarInput: $query) {
            avatarURL
            message
        }
    }
`;
