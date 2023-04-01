import { DocumentNode, gql } from "@apollo/client";

export const GET_TASKS: DocumentNode = gql`
    query getTasks($query: TaskParamsInput) {
        getTasks(paramsInput: $query) {
            tasksOnPageQty
            totalPagesQty
            totalTasksQty
            tasks {
                _id
                title
                subtitle
                description
                completed
                deadline
                createdAt
                updatedAt
                completedAt
            }
        }
    }
`;
