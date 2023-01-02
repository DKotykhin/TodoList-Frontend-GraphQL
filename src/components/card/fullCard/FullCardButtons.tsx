import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { Button } from "@mui/material";

import { DELETE_TASK, UPDATE_TASK } from 'apollo/mutation/mutateTask';
import { GET_TASKS } from "apollo/query/getTasks";
import { ICompleteTask, ITask } from "types/taskTypes";

interface IFullCardButtons {
    task: ITask;
    successMessage: (arg0: string) => void;
    errorMessage: (arg0: string) => void;
    closeModal: () => void;
}

const FullCardButtons: React.FC<IFullCardButtons> = ({ task, successMessage, errorMessage, closeModal }) => {
    const { _id, completed } = task;

    const [updateTask, { loading }] = useMutation(UPDATE_TASK, {
        refetchQueries: [{ query: GET_TASKS }, 'getTasksQuery'],
        onCompleted: (data) => {
            successMessage(data.updateTask.message)
        },
        onError: (err) => {
            errorMessage(err.message);
        }
    });

    const [deleteTask] = useMutation(DELETE_TASK, {
        refetchQueries: [{ query: GET_TASKS }, 'getTasksQuery'],
        onCompleted: (data) => {
            successMessage(data.deleteTask.message)
        },
        onError: (err) => {
            errorMessage(err.message);
        }
    });

    const navigate = useNavigate();

    const handleDelete = (id: string) => {
        successMessage('');
        errorMessage('');
        closeModal();
        deleteTask({ variables: { query: { _id: id } } });
    };

    const handleUpdate = (id: string): void => {
        navigate(`/updatetask/${id}`);
    };

    const handleComplete = (data: ITask) => {
        successMessage('');
        errorMessage('');
        closeModal();
        const newData: ICompleteTask = { completed: !data.completed, _id: data._id, title: data?.title };
        updateTask({ variables: { query: newData } });
    };

    return (
        <>
            <Button
                size="small"
                color="error"
                onClick={() => handleDelete(_id)}
            >
                Delete
            </Button>
            <Button
                size="small"
                color="inherit"
                onClick={() => handleUpdate(_id)}
            >
                Update
            </Button>
            <Button size="small" onClick={() => handleComplete(task)}>
                {loading
                    ? "Loading..."
                    : completed
                        ? "Undo Complete"
                        : "Complete"}
            </Button>
        </>
    );
};

export default FullCardButtons;
