import React, { useState, useEffect, useMemo } from 'react';
import { Navigate } from "react-router-dom";

import { Box, Container, Typography, Modal } from "@mui/material";

import SelectTaskCount from './SelectTaskCount';
import PaginationControlled from './PaginationControlled';
import ShortCardList from 'components/card/shortCard/ShortCardList';
import FullCard from 'components/card/fullCard/FullCard';
import Spinner from 'components/spinner/Spinner';

import { useQuery } from "@apollo/client";
import { GET_TASKS } from 'apollo/query/getTasks';

import { querySelector, setQuery } from "store/querySlice";
import { useAppDispatch, useAppSelector } from "store/reduxHooks";

import { IQueryData, ITask, ITaskResponse } from 'types/taskTypes';

import styles from "./cardList.module.scss";

interface ICardListNew {
    tabIndex: number;
    searchQuery: string;
    fieldValue: string;
    AZValue: number;
}

interface IQueryResponse {
    getTasks: ITaskResponse;
}

const CardList: React.FC<ICardListNew> = ({ tabIndex, searchQuery, fieldValue, AZValue }) => {

    const { query: { limit, page } } = useAppSelector(querySelector);

    const [tasksOnPage, setTasksOnPage] = useState(limit);
    const [currentPageNumber, setCurrentPageNumber] = useState(page);

    const [cardFullOpen, setCardFullOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState<ITask>();

    const dispatch = useAppDispatch();

    const query: IQueryData = useMemo(
        () => ({
            limit: tasksOnPage,
            page: currentPageNumber,
            tabKey: tabIndex,
            sortField: fieldValue,
            sortOrder: AZValue,
            search: searchQuery,
        }),
        [
            currentPageNumber,
            searchQuery,
            fieldValue,
            AZValue,
            tabIndex,
            tasksOnPage,
        ]
    );

    const { data, loading, error } = useQuery<IQueryResponse>(GET_TASKS, {
        variables: { query }
    });
    const taskdata = data?.getTasks.tasks ? data.getTasks.tasks : [];

    useEffect(() => {
        dispatch(setQuery({ query }));
    }, [dispatch, query]);

    useEffect(() => {
        if (Boolean(data?.getTasks.totalTasksQty && (data?.getTasks.tasksOnPageQty === 0))) {
            setCurrentPageNumber(prev => prev - 1);
        }
    }, [data?.getTasks.tasksOnPageQty, data?.getTasks.totalTasksQty]);

    useEffect(() => {
        setCurrentPageNumber(1);
    }, [tabIndex]);

    const handleTasksOnPage = (data: number) => {
        setTasksOnPage(data);
    };

    const handleCurrentPageNumber = (value: number) => {
        setCurrentPageNumber(value);
    };

    const handleOpenFullCard = (id: string): void => {
        const fullCard = taskdata.find((task: ITask) => task._id === id);
        setCardFullOpen(true);
        setCurrentTask(fullCard);
    };

    const cardFullClose = (): void => {
        setCardFullOpen(false);
    };

    return !loading ? (
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
                {data?.getTasks.totalTasksQty
                    ? `On page: ${data.getTasks.tasksOnPageQty}, total: ${data.getTasks.totalTasksQty}`
                    : "No cards"}
            </Typography>
            <Box className={styles.cardList__box}>
                <ShortCardList taskdata={taskdata} handleOpenFullCard={handleOpenFullCard} />
            </Box>
            <Box className={styles.cardList__taskAmountBox} >
                <Typography className={styles.cardList__taskAmount} >tasks on page:</Typography>
                <SelectTaskCount tasksOnPage={tasksOnPage} setTasksOnPage={handleTasksOnPage} />
            </Box>
            {data?.getTasks.totalPagesQty ? data.getTasks.totalPagesQty > 1 ?
                <PaginationControlled
                    totalPagesQty={data.getTasks.totalPagesQty}
                    currentPage={handleCurrentPageNumber}
                    currentPageNumber={currentPageNumber} /> : null : null
            }
        </Container>
    ) : !!error ? <Navigate to={'/login'} /> : <Spinner />
}

export default CardList;
