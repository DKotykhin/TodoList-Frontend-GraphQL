import React, { useState } from 'react';

import { Box, Container, Typography, Modal } from "@mui/material";

import ShortCardList from 'components/card/shortCard/ShortCardList';
import FullCard from 'components/card/fullCard/FullCard';

import { ITask, ITaskResponse } from 'types/taskTypes';

import styles from "./cardList.module.scss";

interface ICardList {
    taskdata?: ITaskResponse;
};

const CardList: React.FC<ICardList> = ({ taskdata }) => {

    const taskDefinedData = taskdata?.tasks ? taskdata.tasks : [];

    const [cardFullOpen, setCardFullOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState<ITask>();

    const handleOpenFullCard = (id: string): void => {
        const fullCard = taskDefinedData.find((task: ITask) => task._id === id);
        setCardFullOpen(true);
        setCurrentTask(fullCard);
    };

    const cardFullClose = (): void => {
        setCardFullOpen(false);
    };

    return (
        <Container maxWidth="xl" className={styles.cardList}>
            <Modal open={cardFullOpen} onClose={cardFullClose}>
                <>
                    <FullCard
                        task={currentTask}
                        closeModal={cardFullClose}
                    />
                </>
            </Modal>
            <Typography className={styles.cardList__subtitle}>
                {taskdata?.totalTasksQty
                    ? `On page: ${taskdata?.tasksOnPageQty}, total: ${taskdata?.totalTasksQty}`
                    : "No cards"}
            </Typography>
            <Box className={styles.cardList__box}>
                <ShortCardList taskdata={taskDefinedData} handleOpenFullCard={handleOpenFullCard} />
            </Box>            
        </Container>
    )
}

export default CardList;
