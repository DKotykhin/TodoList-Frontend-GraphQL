import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Typography, Paper } from "@mui/material";

import DeleteDialog from "./DeleteDialog";
import SnackBar from "components/snackBar/SnackBar";

import { useFetchDeleteUserMutation } from "services/userServices";
import { fetchUser } from "services/userServices";
import { useAppDispatch } from "store/hook";
import { logout } from "store/userSlice";

const DeleteForm: React.FC = () => {

    const [deleteError, setDeleteError] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [deleteUser, { isLoading }] = useFetchDeleteUserMutation()

    const handleDelete = async () => {
        setDeleteError('');
        await deleteUser()
            .unwrap()
            .then(response => {
                console.log(response.message);
                dispatch(fetchUser.util.resetApiState());
                dispatch(logout());
                sessionStorage.removeItem("rememberMe");
                localStorage.removeItem("rememberMe");
                navigate("/login");
            })
            .catch((error) => {
                console.log(error.data.message);
                setDeleteError(error.data.message);
            })
    };

    return (
        <Paper elevation={10} sx={{ border: '2px solid #ff0000' }}>
            <Typography className="profile subtitle">
                {isLoading ? 'Deleting...' : 'Need to delete Profile?'}
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