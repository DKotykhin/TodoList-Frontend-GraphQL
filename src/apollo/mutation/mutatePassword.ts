import { DocumentNode, gql } from "@apollo/client";

export const USER_CONFIRM_PASSWORD: DocumentNode = gql`
    mutation ($query: UserPasswordInput) {
        userConfirmPassword(passwordInput: $query) {
            status
            message
        }
    }
`;

export const USER_UPDATE_PASSWORD: DocumentNode = gql`
    mutation ($query: UserPasswordInput) {
        userUpdatePassword(passwordInput: $query) {
            _id
            name
            email
            avatarURL
            createdAt
            message
        }
    }
`;
