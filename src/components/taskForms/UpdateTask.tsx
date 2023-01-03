import React, { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";

import { format } from "date-fns";

import { Container, Typography, InputLabel, Checkbox } from "@mui/material";
import { Box } from "@mui/system";

import { UpdateTaskFormValidation } from "../taskFields/taskFormValidation";
import SubmitCancelButtons from "./SubmitCancelButtons";
import { TitleField, MDEField, SubtitleField, DeadlineField } from "../taskFields";

import { UPDATE_TASK } from 'apollo/mutation/mutateTask';
import { GET_TASKS } from "apollo/query/getTasks";
import { useAppSelector } from 'store/hook';
import { ITask, ITaskResponse, ITaskUpdateResponse, IUpdateTask } from "types/taskTypes";

import "./task.scss";

interface IUpdateForm {
    title: string;
    subtitle?: string;
    deadline?: string;
    completed: boolean;
}

interface IQueryResponse {
    getTasks: ITaskResponse;
}
interface IMutationResponse {
    updateTask: ITaskUpdateResponse;
}

const UpdateTaskComponent: React.FC = () => {

    const params = useParams();;
    const [mdeValue, setMdeValue] = useState("");;
    const navigate = useNavigate();

    const { query } = useAppSelector((state) => state.query);
    const { query: { limit } } = useAppSelector((state) => state.query);

    const { data } = useQuery<IQueryResponse>(GET_TASKS, {
        variables: { query: { ...query, limit: parseInt(limit) } }
    });

    const [updateTask, { loading }] = useMutation<IMutationResponse, { query: IUpdateTask }>(UPDATE_TASK, {
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
        onError: (err) => {
            console.log(err.message);
            alert(err.message);
        }
    });

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<IUpdateForm>(UpdateTaskFormValidation);

    const currentTask = data?.getTasks.tasks ? data.getTasks.tasks.filter((task: ITask) => task._id === params.taskId) : [];

    const { title, subtitle, description, deadline, _id, completed } =
        currentTask[0];

    const parseDeadline = deadline ? format(new Date(deadline), "yyyy-LL-dd HH:mm") : '';

    const onSubmit = (data: IUpdateForm) => {
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
        updateTask({ variables: { query: totalData } })
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
                <SubmitCancelButtons loading={loading} />
            </Box>
        </Container>
    );
};

export default UpdateTaskComponent;
