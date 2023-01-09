import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { Box } from "@mui/system";
import { Container, Typography } from "@mui/material";

import SubmitCancelButtons from "./SubmitCancelButtons";
import { TitleField, MDEField, SubtitleField, DeadlineField } from "../taskFields";
import { AddTaskFormValidation } from "../taskFields/taskFormValidation";

import { useMutation } from "@apollo/client";
import { CREATE_TASK } from "apollo/mutation/mutateTask";

import { IAddTask, ITask } from "types/taskTypes";

import "./task.scss";

interface IMutationResponse {
    createTask: ITask;
}

const AddTaskComponent: React.FC = () => {

    const [mdeValue, setMdeValue] = useState("");
    const navigate = useNavigate();

    const [addTask, { loading }] = useMutation<IMutationResponse, { query: IAddTask }>(CREATE_TASK, {
        update(cache) {
            cache.modify({
                fields: {
                    getTasks() { }
                }
            })
        },
        onCompleted: () => {
            navigate("/", { replace: true })
        },
        onError: (err) => toast.error(err.message)
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<IAddTask>(AddTaskFormValidation);

    const onSubmit = (data: IAddTask) => {
        const { title, subtitle, deadline } = data;
        const newDeadline: string = deadline ? new Date(deadline).toJSON() : ''
        const newData: IAddTask = {
            title,
            subtitle,
            description: mdeValue,
            deadline: newDeadline,
            completed: false
        };
        addTask({ variables: { query: newData } });
    };

    const MDEChange = useCallback((data: string) => {
        setMdeValue(data);
    }, []);

    return (
        <Container className="task" maxWidth="sm">
            <Typography className="task title">Add Task</Typography>
            <Box onSubmit={handleSubmit(onSubmit)} component="form">

                <TitleField register={register} error={errors} value={''} />
                <SubtitleField register={register} value={''} />
                <MDEField MDEChange={MDEChange} />
                <DeadlineField register={register} value={''} />

                <SubmitCancelButtons loading={loading} />
            </Box>
        </Container>
    );
};

export default AddTaskComponent;
