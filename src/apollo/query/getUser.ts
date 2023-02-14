import { DocumentNode, gql } from "@apollo/client";

export const GET_USER_BY_TOKEN: DocumentNode = gql`
    query userToken {
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
    query userLogin($email: String!, $password: String!) {
        userLogin(email: $email, password: $password) {
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

export const TASK_STATISTIC: DocumentNode = gql`
    query getStatistic {
        getStatistic {
            totalTasks
            activeTasks
            completedTasks
            overdueTasks
            message
        }
    }
`;
