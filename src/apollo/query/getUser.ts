import { DocumentNode, gql } from "@apollo/client";

export const GET_USER_BY_TOKEN: DocumentNode = gql`
    query UserToken{
        getUserByToken {
            _id
            email
            name
            avatarURL
            createdAt
            message
        }
    }
`;

export const USER_LOGIN: DocumentNode = gql`
    query ($query: UserLoginInput) {
        userLogin(loginInput: $query) {
            _id
            name
            avatarURL
            createdAt
            token
            message
        }
    }
`;