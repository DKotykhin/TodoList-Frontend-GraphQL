import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Box } from "@mui/system";
import { Container, Typography } from "@mui/material";

import { TitleField, MDEField, SubtitleField, DeadlineField } from "../taskFields";
import { AddTaskFormValidation } from "../taskFields/taskFormValidation";
import { useFetchAddTaskMutation } from "services/taskServices";

import { IAddTask } from "types/taskTypes";

import "./task.scss";
import SubmitCancelButtons from "./SubmitCancelButtons";

const AddTaskComponent: React.FC = () => {
   
    const [mdeValue, setMdeValue] = useState("");
    const navigate = useNavigate();

    const [addTask, { isLoading }] = useFetchAddTaskMutation();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<IAddTask>(AddTaskFormValidation);

    const onSubmit = async (data: IAddTask) => {
        const { title, subtitle, deadline } = data;      
        const newDeadline: string = deadline ? new Date(deadline).toJSON() : ''
        const newData: IAddTask = {
            title,
            subtitle,
            description: mdeValue,
            deadline: newDeadline,
            completed: false
        };
        await addTask(newData)
            .unwrap()
            .then(() => navigate("/", { replace: true }))
            .catch((error: { data: { message: string }}) => {
                console.log(error.data.message);
                alert(error.data.message);
            })
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

                <SubmitCancelButtons loading={isLoading} />
            </Box>
        </Container>
    );
};

export default AddTaskComponent;
