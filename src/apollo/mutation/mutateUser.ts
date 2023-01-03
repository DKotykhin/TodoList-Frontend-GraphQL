import { DocumentNode, gql } from "@apollo/client";

export const USER_REGISTER: DocumentNode = gql`
    mutation ($query: UserRegisterInput) {
        userRegister(registerInput: $query) {            
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
