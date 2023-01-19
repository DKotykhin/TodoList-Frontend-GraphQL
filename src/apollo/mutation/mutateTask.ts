import { DocumentNode, gql } from "@apollo/client";

export const CREATE_TASK: DocumentNode = gql`
    mutation ($query: TaskAddInput) {
        createTask(createTaskInput: $query) {
            _id
            title
            subtitle
            description
            completed
            deadline
            createdAt            
            message
        }
    }
`;

export const UPDATE_TASK: DocumentNode = gql`
    mutation ($query: TaskUpdateInput) {
        updateTask(updateTaskInput: $query) {
            _id
            title
            subtitle
            description
            completed
            deadline
            createdAt            
            message
        }
    }
`;

export const DELETE_TASK: DocumentNode = gql`
    mutation ($_id: ID!) {
        deleteTask(_id: $_id) {
            status {
                deletedCount
                acknowledged
            }
            message
        }
    }
`;
