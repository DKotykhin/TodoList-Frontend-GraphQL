import React from 'react';

import { Grid } from "@mui/material";

import ShortCard from "components/card/shortCard/ShortCard";
import { ITask } from 'types/taskTypes';

import styles from "./shortCard.module.scss";

interface IShortCardList {
    taskdata?: ITask[];
    handleOpenFullCard: (arg0: string) => void;
};

const ShortCardList: React.FC<IShortCardList> = ({ taskdata, handleOpenFullCard }) => {

    return (
        <Grid container sx={{ mb: 4 }}>
            {taskdata?.map((task) => (
                <Grid item xs={12} md={6} xl={4} key={task._id} className={styles.shortCard__grid}>
                    <ShortCard
                        task={task}
                        handleOpenFullCard={() => handleOpenFullCard(task._id)}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default ShortCardList;