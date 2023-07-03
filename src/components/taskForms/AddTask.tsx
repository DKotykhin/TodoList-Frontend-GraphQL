import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { Box } from "@mui/system";
import { Container, Typography } from "@mui/material";

import { TitleField, MDEField, SubtitleField, DeadlineField } from "../fields/taskFields/_index";
import { AddTaskFormValidation } from "../../validations/taskFormValidation";
import Buttons from "./buttons/Buttons";

import { useMutation } from "@apollo/client";
import { CREATE_TASK } from "apollo/mutation/mutateTask";

import { IAddTask, ITask } from "types/taskTypes";

import styles from "./task.module.scss";

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
            });
        },
        onCompleted: (data) => {
            toast.success(data.createTask.message);
            navigate("/", { replace: true });
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
        const newData: IAddTask = {
            title,
            subtitle,
            description: mdeValue,
            ...(deadline && { deadline: new Date(deadline).toJSON() }),
            completed: false
        };
        addTask({ variables: { query: newData } });
    };

    const MDEChange = useCallback((data: string) => {
        setMdeValue(data);
    }, []);

    return (
        <Container className={styles.task} maxWidth="sm">
            <Typography className={styles.task__title}>Add Task</Typography>
            <Box onSubmit={handleSubmit(onSubmit)} component="form">

                <TitleField register={register} error={errors.title} value={''} />
                <SubtitleField register={register} value={''} />
                <MDEField MDEChange={MDEChange} />
                <DeadlineField register={register} value={''} />

                <Buttons loading={loading} />
            </Box>
        </Container>
    );
};

export default AddTaskComponent;
