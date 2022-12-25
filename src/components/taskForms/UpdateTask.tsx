import React, { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { format } from "date-fns";

import { Container, Typography, InputLabel, Checkbox } from "@mui/material";
import { Box } from "@mui/system";

import { UpdateTaskFormValidation } from "../taskFields/taskFormValidation";
import SubmitCancelButtons from "./SubmitCancelButtons";
import { TitleField, MDEField, SubtitleField, DeadlineField } from "../taskFields";
import { useFetchUpdateTaskMutation, useFetchAllTasksQuery } from "services/taskServices";

import { useAppSelector } from 'store/hook';
import { ITask, IUpdateTask } from "types/taskTypes";

import "./task.scss";

interface IUpdateForm {
    title: string;
    subtitle?: string;
    deadline?: string;
    completed: boolean;
}

const UpdateTaskComponent: React.FC = () => {

    const params = useParams();;
    const [mdeValue, setMdeValue] = useState("");;
    const navigate = useNavigate();

    const { query } = useAppSelector((state) => state.query);

    const { data } = useFetchAllTasksQuery(query);
    const [updateTask, { isLoading }] = useFetchUpdateTaskMutation();

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<IUpdateForm>(UpdateTaskFormValidation);

    const currentTask = data?.tasks ? data.tasks.filter((task: ITask) => task._id === params.taskId) : [];

    const { title, subtitle, description, deadline, _id, completed } =
        currentTask[0];

    const parseDeadline = deadline ? format(new Date(deadline), "yyyy-LL-dd HH:mm") : '';

    const onSubmit = async (data: IUpdateForm) => {
        const { title, subtitle, deadline, completed } = data;
        const newDeadline = deadline ? new Date(deadline).toJSON() : '';
        const totalData: IUpdateTask = {
            _id,
            title,
            subtitle,
            completed,
            description: mdeValue,
            deadline: newDeadline,
        };
        await updateTask(totalData)
            .unwrap()
            .then(() => navigate("/", { replace: true }))
            .catch((error: { data: { message: string } }) => {
                console.log(error.data.message);
                alert(error.data.message);
            })
    };

    const MDEChange = useCallback((data: string) => {
        setMdeValue(data);
    }, []);

    return (
        <Container className="task" maxWidth="sm">
            <Typography className="task title">Update Task</Typography>
            <Box onSubmit={handleSubmit(onSubmit)} component="form">

                <TitleField register={register} error={errors} value={title} />
                <SubtitleField register={register} value={subtitle} />
                <MDEField MDEChange={MDEChange} description={description} />
                <DeadlineField register={register} value={parseDeadline} />

                <Box className="task checkbox">
                    <Checkbox
                        {...register("completed")}
                        defaultChecked={completed}
                    />
                    <InputLabel sx={{ mt: 1 }}>Completed</InputLabel>
                </Box>
                <SubmitCancelButtons loading={isLoading} />
            </Box>
        </Container>
    );
};

export default UpdateTaskComponent;
