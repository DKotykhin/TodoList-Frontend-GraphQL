import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { Typography, Paper } from "@mui/material";

import DeleteDialog from "./DeleteDialog";

import client from "apollo/client";
import { useMutation } from '@apollo/client';
import { DELETE_USER } from "apollo/mutation/mutateUser";

import { logout } from "store/userSlice";
import { useAppDispatch } from "store/hook";

import { IUserDeleteResponse } from "types/userTypes";

interface IResponse {
    userDelete: IUserDeleteResponse;
}

const DeleteForm: React.FC<{ id?: string }> = ({ id }) => {

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

    const handleDelete = () => {
        deleteUser({ variables: { _id: id } });
    };

    return (
        <Paper elevation={10} sx={{ border: '2px solid #ff0000' }}>
            <Typography className="profile subtitle">
                {loading ? 'Deleting...' : 'Need to delete Profile?'}
            </Typography>
            <DeleteDialog
                dialogTitle={"You really want to delete user?"}
                deleteAction={handleDelete}
            />
        </Paper>
    )
}

export default DeleteForm;