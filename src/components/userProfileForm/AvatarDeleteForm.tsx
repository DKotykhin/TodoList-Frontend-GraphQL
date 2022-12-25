import React, { useState } from 'react';

import DeleteDialog from "../userDeleteForm/DeleteDialog";
import SnackBar from 'components/snackBar/SnackBar';

import { useFetchDeleteAvatarMutation } from "services/userServices";
import { IUser, RequestError } from 'types/userTypes';

const AvatarDeleteForm: React.FC<{ user?: IUser }> = ({ user }) => {

    const [deleteError, setDeleteError] = useState('');
    const [deleteAvatar, { data, error }] = useFetchDeleteAvatarMutation();
    const responseError = (error as RequestError)?.data.message;

    const handleDelete = async () => {
        setDeleteError('');
        const avatarURL: string | undefined = user?.avatarURL;
        if (avatarURL) {
            await deleteAvatar();
        } else {
            console.log("Avatar doesn't exist");
            setDeleteError("Avatar doesn't exist");
        }
    }

    return (
        <>
            <DeleteDialog
                dialogTitle={"You really want to delete avatar?"}
                deleteAction={handleDelete}
            />
            <SnackBar successMessage={data?.message || ''} errorMessage={deleteError || responseError} />
        </>
    )
}

export default AvatarDeleteForm;