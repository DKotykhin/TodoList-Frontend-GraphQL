import React, { useState, useEffect, useMemo } from 'react';
import { Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { Box, Container, Typography, Modal } from "@mui/material";

import SelectTaskCount from './SelectTaskCount';
import PaginationControlled from './PaginationControlled';
import ShortCardList from 'components/card/shortCard/ShortCardList';
import FullCard from 'components/card/fullCard/FullCard';
import Spinner from 'components/spinner/Spinner';
import SnackBar from 'components/snackBar/SnackBar';

import { setQuery } from "store/querySlice";
import { useAppDispatch, useAppSelector } from "store/hook";
import { GET_TASKS } from 'apollo/query/getTasks';
import { ITask } from 'types/taskTypes';

import "./cardList.scss";

interface ICardListNew {
    tabIndex: number;
    searchQuery: string;
    fieldData: string;
    AZData: string;
}

const CardList: React.FC<ICardListNew> = ({ tabIndex, searchQuery, fieldData, AZData }) => {

    const { query: { limit, page, sortField, sortOrder } } = useAppSelector((state) => state.query);

    const [totalTasks, setTotalTasks] = useState(limit);
    const [currentPageNumber, setCurrentPageNumber] = useState(page);

    const [sortParams, setSortParams] = useState({ sortField, sortOrder });

    const [cardFullOpen, setCardFullOpen] = useState(false);
    const [cardFullId, setCardFullId] = useState("");

    const [succsessMessageHook, setSuccsessMessageHook] = useState("");
    const [errorMessageHook, setErrorMessageHook] = useState("");

    const dispatch = useAppDispatch();

    const query = useMemo(
        () => ({
            limit: totalTasks,
            page: currentPageNumber,
            tabKey: tabIndex,
            sortField: sortParams.sortField,
            sortOrder: sortParams.sortOrder,
            search: searchQuery
        }),
        [currentPageNumber, searchQuery, sortParams.sortField, sortParams.sortOrder, tabIndex, totalTasks]
    );

    const { data, loading, error } = useQuery(GET_TASKS, {
        variables: { query: { ...query, limit: parseInt(totalTasks) } }
    });

    const taskdata = data?.getTasks.tasks ? data.getTasks.tasks : [];
    const fullCard = taskdata.filter((task: ITask) => task._id === cardFullId)[0];

    useEffect(() => {
        setCurrentPageNumber(1);
    }, [tabIndex]);

    useEffect(() => {
        dispatch(setQuery({ query }));
    }, [dispatch, query]);

    useEffect(() => {
        switch (fieldData) {
            case ('created'): setSortParams({ sortField: 'createdAt', sortOrder: AZData === 'A-z' ? -1 : 1 });
                break;
            case ('deadline'): setSortParams({ sortField: 'deadline', sortOrder: AZData === 'A-z' ? 1 : -1 });
                break;
            case ('title'): setSortParams({ sortField: 'title', sortOrder: AZData === 'A-z' ? 1 : -1 });
                break;
            default: setSortParams({ sortField: 'createdAt', sortOrder: -1 });
                break;
        }
    }, [fieldData, AZData]);

    const handleTotalTasks = (data: string) => {
        setTotalTasks(data);
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

    const successMessage = (data: string): void => {
        setSuccsessMessageHook(data);
    };

    const errorMessage = (data: string): void => {
        setErrorMessageHook(data);
    };

    return !loading ? (
        <Container className="cardList" maxWidth="xl">
            <Box className="cardList cardListBox">
                <Modal open={cardFullOpen} onClose={cardFullClose}>
                    <Box sx={{ boxShadow: 24 }} className='cardList fullCard'>
                        <FullCard
                            task={fullCard}
                            successMessage={successMessage}
                            errorMessage={errorMessage}
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
                <SelectTaskCount totalTasks={totalTasks} setTotalTasks={handleTotalTasks} />
            </Box>
            <Box>
                {data?.getTasks.totalPagesQty > 1 &&
                    <PaginationControlled
                        totalPagesQty={data?.getTasks.totalPagesQty}
                        currentPage={handleCurrentPageNumber}
                        currentPageNumber={currentPageNumber} />
                }
            </Box>
            <SnackBar successMessage={succsessMessageHook} errorMessage={errorMessageHook} />
        </Container>
    ) : !!error ? <Navigate to={'/login'} /> : <Spinner />
}

export default CardList;
