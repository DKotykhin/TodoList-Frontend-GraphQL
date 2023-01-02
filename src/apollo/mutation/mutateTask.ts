import { DocumentNode, gql } from "@apollo/client";

export const CREATE_TASK: DocumentNode = gql`
    mutation ($query: TaskInput) {
        createTask(createTaskInput: $query) {
            _id
            title
            subtitle
            description
            completed
            deadline
            createdAt
            updatedAt
            message
        }
    }
`;

export const UPDATE_TASK: DocumentNode = gql`
    mutation ($query: TaskInput) {
        updateTask(updateTaskInput: $query) {
            status {
                matchedCount
                modifiedCount
                upsertedId
                acknowledged
            }
            message
        }
    }
`;

export const DELETE_TASK: DocumentNode = gql`
    mutation ($query: TaskDeleteInput) {
        deleteTask(deleteTaskInput: $query) {
            status {
                deletedCount
                acknowledged
            }
            message
        }
    }
`;
