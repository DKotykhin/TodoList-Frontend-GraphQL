import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { Button } from "@mui/material";

import { useMutation } from "@apollo/client";
import { DELETE_TASK, UPDATE_TASK } from 'apollo/mutation/mutateTask';

import { ICompleteTask, ITask, ITaskDeleteResponse, IUpdateTask } from "types/taskTypes";

interface IFullCardButtons {
    task: ITask;
    closeModal: () => void;
}
interface IUpdateResponse {
    updateTask: ITask;
}

interface IDeleteResponse {
    deleteTask: ITaskDeleteResponse;
}

const FullCardButtons: React.FC<IFullCardButtons> = ({ task, closeModal }) => {
    const { _id, completed } = task;

    const [updateTask, { loading }] = useMutation<IUpdateResponse, { query: IUpdateTask }>(UPDATE_TASK, {
        update(cache) {
            cache.modify({
                fields: {
                    getTasks() { }
                }
            })
        },
        onCompleted: (data) => {
            toast.success(data.updateTask.message)
        },
        onError: (err) => {
            toast.error(err.message);
        }
    });

    const [deleteTask] = useMutation<IDeleteResponse, { _id: string }>(DELETE_TASK, {
        update(cache) {
            cache.modify({
                fields: {
                    getTasks() { }
                }
            })
        },
        onCompleted: (data) => {
            toast.success(data.deleteTask.message)
        },
        onError: (err) => {
            toast.error(err.message);
        }
    });

    const navigate = useNavigate();

    const handleDelete = (_id: string) => {
        closeModal();
        deleteTask({ variables: { _id } });
    };

    const handleUpdate = (id: string): void => {
        navigate(`/updatetask/${id}`);
    };

    const handleComplete = (data: ITask) => {
        closeModal();
        const { completed, _id, title } = data;
        const newData: ICompleteTask = { completed: !completed, _id, title };
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
