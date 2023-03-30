import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { Typography, Paper } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import ChildModal from "components/childModal/ChildModal";

import client from "apollo/client";
import { useMutation } from '@apollo/client';
import { DELETE_USER } from "apollo/mutation/mutateUser";

import { logout } from "store/userSlice";
import { useAppDispatch } from "store/reduxHooks";

import { IUserDeleteResponse } from "types/userTypes";

import styles from "./deleteForm.module.scss";

interface IResponse {
    userDelete: IUserDeleteResponse;
}

const DeleteForm: React.FC<{ id?: string }> = ({ id }) => {

    const [openChildModal, setOpenChildModal] = useState(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [deleteUser, { loading }] = useMutation<IResponse, { _id: string | undefined }>(DELETE_USER, {
        onCompleted: (data) => {
            const { message } = data.userDelete;
            console.log(message);
            client.clearStore();
            dispatch(logout());
            sessionStorage.removeItem("rememberMe");
            localStorage.removeItem("rememberMe");
            navigate("/login");
        },
        onError: (err) => {
            toast.error(err.message);
        }
    })

    const handleSubmit = () => {
        deleteUser({ variables: { _id: id } });
        setOpenChildModal(false);
    };

    const handleClick = (): void => {
        setOpenChildModal(true);
    };
    const handleClose = (): void => {
        setOpenChildModal(false);
    };

    return (
        <Paper elevation={10} className={styles.deleteForm}>
            <Typography className={styles.deleteForm__title}>
                {loading ? 'Deleting...' : 'Need to delete Profile?'}
            </Typography>
            <DeleteForeverIcon onClick={handleClick} className={styles.deleteForm__icon} />
            <ChildModal
                open={openChildModal}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                title={'user'}
            />
        </Paper>
    )
}

export default DeleteForm;