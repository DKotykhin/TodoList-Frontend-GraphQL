import { DocumentNode, gql } from "@apollo/client";

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
            _id
            name
            email
            avatarURL
            createdAt
            message
        }
    }
`;
