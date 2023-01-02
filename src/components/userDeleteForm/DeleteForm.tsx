import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';
import client from "apollo/client";

import { Typography, Paper } from "@mui/material";

import DeleteDialog from "./DeleteDialog";
import SnackBar from "components/snackBar/SnackBar";

import { useAppDispatch } from "store/hook";
import { logout } from "store/userSlice";
import { DELETE_USER } from "apollo/mutation/mutateUser";


const DeleteForm: React.FC<{ id: string }> = ({ id }) => {

    const [deleteError, setDeleteError] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [deleteUser, { loading }] = useMutation(DELETE_USER, {
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
            console.log(err.message);
            setDeleteError(err.message);
        }
    })

    const handleDelete = () => {
        setDeleteError('');
        const del = {
            query: { _id: id }
        }
        deleteUser({ variables: del });
    };

    return (
        <Paper elevation={10} sx={{ border: '2px solid #ff0000' }}>
            <Typography className="profile subtitle">
                {loading ? 'Deleting...' : 'Need to delete Profile?'}
            </Typography>
            <SnackBar successMessage="" errorMessage={deleteError} />
            <DeleteDialog
                dialogTitle={"You really want to delete user?"}
                deleteAction={handleDelete}
            />
        </Paper>
    )
}

export default DeleteForm;