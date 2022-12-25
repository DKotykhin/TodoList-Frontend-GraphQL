import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

import { ICompleteTask, ITask } from "types/taskTypes";
import { useFetchDeleteTaskMutation, useFetchUpdateTaskMutation } from "services/taskServices";

interface IFullCardButtons {
    task: ITask;
    successMessage: (arg0: string) => void;
    errorMessage: (arg0: string) => void;
    closeModal: () => void;
}

const FullCardButtons: React.FC<IFullCardButtons> = ({ task, successMessage, errorMessage, closeModal }) => {
    const { _id, completed } = task;

    const [updateTask, { isLoading }] = useFetchUpdateTaskMutation();
    const [deleteTask] = useFetchDeleteTaskMutation();

    const navigate = useNavigate();

    const handleDelete = async (id: string) => {
        successMessage('');
        errorMessage('');
        closeModal();
        await deleteTask({ _id: id })
            .unwrap()
            .then((res) => {
                successMessage(res.message)
            })
            .catch((error: { data: { message: string } }) => {
                errorMessage(error.data.message);
            })
    };

    const handleUpdate = (id: string): void => {
        navigate(`/updatetask/${id}`);
    };

    const handleComplete = async (data: ITask) => {
        successMessage('');
        errorMessage('');
        closeModal();
        const newData: ICompleteTask = { completed: !data.completed, _id: data._id, title: data?.title };
        await updateTask(newData)
            .unwrap()
            .then(res => {
                successMessage(res.message)
            })
            .catch((error: { data: { message: string } }) => {
                errorMessage(error.data.message);
            })
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
                {isLoading
                    ? "Loading..."
                    : completed
                        ? "Undo Complete"
                        : "Complete"}
            </Button>
        </>
    );
};

export default FullCardButtons;
