import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import DeleteDialog from "../userDeleteForm/DeleteDialog";
import SnackBar from 'components/snackBar/SnackBar';

import { IAvatarResponse, IUser } from 'types/userTypes';
import { DELETE_AVATAR } from 'apollo/mutation/mutateUser';

interface IResponse {
    deleteAvatar: IAvatarResponse;
}

const AvatarDeleteForm: React.FC<{ user?: IUser }> = ({ user }) => {

    const [deleteError, setDeleteError] = useState('');
    const [deleteAvatar, { data, error }] = useMutation<IResponse, { _id: string | undefined }>(DELETE_AVATAR, {
        update(cache) {
            cache.modify({
                fields: {
                    getUserByToken() { }
                }
            })
        },
    });

    const handleDelete = () => {
        setDeleteError('');
        const avatarURL: string | undefined = user?.avatarURL;
        if (avatarURL) {
            deleteAvatar({ variables: { _id: user?._id } });
        } else {
            console.log("Avatar doesn't exist");
            setDeleteError("Avatar doesn't exist");
        }
    };

    return (
        <>
            <DeleteDialog
                dialogTitle={"You really want to delete avatar?"}
                deleteAction={handleDelete}
            />
            <SnackBar successMessage={data?.deleteAvatar.message || ''} errorMessage={deleteError || error?.message || ""} />
        </>
    )
}

export default AvatarDeleteForm;