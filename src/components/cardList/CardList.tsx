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

import "./cardList.scss";

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
    const [cardFullId, setCardFullId] = useState("");

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
    const fullCard = taskdata.filter((task: ITask) => task._id === cardFullId)[0];

    useEffect(() => {
        setCurrentPageNumber(1);
    }, [tabIndex, tasksOnPage]);

    useEffect(() => {
        dispatch(setQuery({ query }));
    }, [dispatch, query]);

    const handleTasksOnPage = (data: number) => {
        setTasksOnPage(data);
    };

    const handleCurrentPageNumber = (value: number) => {
        setCurrentPageNumber(value);
    };

    const handleOpenFullCard = (data: string): void => {
        setCardFullOpen(true);
        setCardFullId(data);
    };

    const cardFullClose = (): void => {
        setCardFullOpen(false);
    };

    return !loading ? (
        <Container className="cardList" maxWidth="xl">
            <Box className="cardList cardListBox">
                <Modal open={cardFullOpen} onClose={cardFullClose}>
                    <Box sx={{ boxShadow: 24 }} className='cardList fullCard'>
                        <FullCard
                            task={fullCard}
                            closeModal={cardFullClose}
                        />
                    </Box>
                </Modal>
                <Typography className="cardList subtitle">
                    {taskdata.length
                        ? `Total amount: ${taskdata.length}`
                        : "No cards"}
                </Typography>
                <ShortCardList taskdata={taskdata} handleOpenFullCard={handleOpenFullCard} />
            </Box>
            <Box className="cardList taskAmountBox" >
                <Typography className="cardList taskAmount" >tasks on page:</Typography>
                <SelectTaskCount tasksOnPage={tasksOnPage} setTasksOnPage={handleTasksOnPage} />
            </Box>
            <Box>
                {data?.getTasks.totalPagesQty ? data.getTasks.totalPagesQty > 1 ?
                    <PaginationControlled
                        totalPagesQty={data.getTasks.totalPagesQty}
                        currentPage={handleCurrentPageNumber}
                        currentPageNumber={currentPageNumber} /> : null : null
                }
            </Box>
        </Container>
    ) : !!error ? <Navigate to={'/login'} /> : <Spinner />
}

export default CardList;
