import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { format } from "date-fns";

import { Container, Typography, InputLabel, Checkbox } from "@mui/material";
import { Box } from "@mui/system";

import { UpdateTaskFormValidation } from "../../validations/taskFormValidation";
import { TitleField, MDEField, SubtitleField, DeadlineField } from "../fields/taskFields/_index";
import Buttons from "./buttons/Buttons";

import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_TASK } from 'apollo/mutation/mutateTask';
import { GET_TASKS } from "apollo/query/getTasks";
import { useAppSelector } from 'store/reduxHooks';
import { querySelector } from "store/querySlice";

import { ITask, ITaskResponse, IUpdateTask } from "types/taskTypes";

import styles from "./task.module.scss";

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
    updateTask: ITask;
}

const UpdateTaskComponent: React.FC = () => {

    const [mdeValue, setMdeValue] = useState("");
    const [singleTask, setSingleTask] = useState<ITask>();

    const { taskId } = useParams();;
    const navigate = useNavigate();

    const { query } = useAppSelector(querySelector);

    const { data } = useQuery<IQueryResponse>(GET_TASKS, {
        variables: { query }
    });

    useEffect(() => {
        const currentTask = data?.getTasks.tasks.filter((task: ITask) => task._id === taskId);
        if (currentTask?.length) setSingleTask(currentTask[0]);
    }, [data?.getTasks.tasks, navigate, taskId]);

    const [updateTask, { loading }] = useMutation<IMutationResponse, { query: IUpdateTask }>(UPDATE_TASK, {
        update(cache) {
            cache.modify({
                fields: {
                    getTasks() { }
                }
            });
        },
        onCompleted: (data) => {
            toast.success(data.updateTask.message);
            navigate("/", { replace: true });
        },
        onError: (err) => toast.error(err.message)
    });

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<IUpdateForm>(UpdateTaskFormValidation);

    const onSubmit = (data: IUpdateForm) => {
        const { title, subtitle, deadline, completed } = data;
        const totalData: IUpdateTask = {
            _id: singleTask?._id || "",
            title,
            subtitle,
            completed,
            description: mdeValue,
            ...(deadline && { deadline: new Date(deadline).toJSON() }),
        };
        updateTask({ variables: { query: totalData } });
    };

    const MDEChange = useCallback((data: string) => {
        setMdeValue(data);
    }, []);

    return (
        <Container className={styles.task} maxWidth="sm">
            <Typography className={styles.task__title}>Update Task</Typography>
            {singleTask &&
                <Box onSubmit={handleSubmit(onSubmit)} component="form">

                    <TitleField register={register} error={errors.title} value={singleTask.title} />
                    <SubtitleField register={register} value={singleTask.subtitle} />
                    <MDEField MDEChange={MDEChange} description={singleTask.description} />
                    <DeadlineField register={register} value={format(new Date(singleTask.deadline || ""), "yyyy-LL-dd HH:mm")} />

                    <Box className={styles.task__checkbox}>
                        <Checkbox
                            {...register("completed")}
                            defaultChecked={singleTask.completed}
                        />
                        <InputLabel>Completed</InputLabel>
                    </Box>
                    <Buttons loading={loading} />
                </Box>
            }
        </Container>
    );
};

export default UpdateTaskComponent;
