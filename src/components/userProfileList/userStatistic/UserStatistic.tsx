import React from "react";

import { Typography, Paper, Box } from "@mui/material";

import { useQuery } from "@apollo/client";
import { TASK_STATISTIC } from "apollo/query/getUser";

import { ITaskStatisticResponse } from "types/taskTypes";

import styles from "./userStatistic.module.scss";

interface IStatistic {
    getStatistic: ITaskStatisticResponse;
}

const UserStatistic: React.FC = () => {

    const { data, loading } = useQuery<IStatistic>(TASK_STATISTIC);

    return (
        <Paper elevation={10} className={styles.statistic}>
            {loading ?
                <Typography className={styles.title}>
                    {"Loading..."}
                </Typography> :
                <>
                    <Typography className={styles.title}>
                        {"Your statistic:"}
                    </Typography>
                    {data?.getStatistic.totalTasks ?
                        <Box className={styles.subtitle}>
                            <Box className={styles.box}>
                                <Typography>
                                    {"Total tasks:"}
                                </Typography>
                                <Typography>
                                    {data.getStatistic.totalTasks}
                                </Typography>
                            </Box>
                            <Box className={styles.box}>
                                <Typography>
                                    {"Active tasks:"}
                                </Typography>
                                <Typography>
                                    {data.getStatistic.activeTasks}
                                </Typography>
                            </Box>
                            <Box
                                className={styles.box}
                                sx={data.getStatistic.overdueTasks ? { color: '#ff0000' } : null}
                            >
                                <Typography>
                                    {"Overdue tasks:"}
                                </Typography>
                                <Typography>
                                    {data.getStatistic.overdueTasks}
                                </Typography>
                            </Box>
                            <Box
                                className={styles.box}
                                sx={data.getStatistic.completedTasks ? { color: '#00a1b6' } : null}
                            >
                                <Typography>
                                    {"Completed tasks:"}
                                </Typography>
                                <Typography>
                                    {data.getStatistic.completedTasks}
                                </Typography>
                            </Box>
                        </Box>
                        :
                        <Typography className={styles.text}>
                            {"You don't have any task..."}
                        </Typography>
                    }
                </>
            }
        </Paper>
    )
}

export default UserStatistic;