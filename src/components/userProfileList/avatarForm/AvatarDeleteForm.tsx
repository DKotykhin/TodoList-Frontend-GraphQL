import React from 'react';
import { toast } from 'react-toastify';

import DeleteDialog from "../deleteDialog/DeleteDialog";

import { useMutation } from '@apollo/client';
import { DELETE_AVATAR } from 'apollo/mutation/mutateUser';

import { IAvatarResponse, IUser } from 'types/userTypes';

interface IResponse {
    deleteAvatar: IAvatarResponse;
};

const AvatarDeleteForm: React.FC<{ user?: IUser }> = ({ user }) => {

    const [deleteAvatar] = useMutation<IResponse, { _id: string | undefined }>(DELETE_AVATAR, {
        update(cache) {
            cache.modify({
                fields: {
                    getUserByToken() { }
                }
            })
        },
        onCompleted: (data) => toast.success(data.deleteAvatar.message),
        onError: (err) => toast.error(err.message)
    });

    const handleDelete = () => {
        const avatarURL: string | undefined = user?.avatarURL;
        if (avatarURL) {
            deleteAvatar({ variables: { _id: user?._id } });
        } else {
            toast.warn("Avatar doesn't exist");
        }
    };

    return (
        <>
            <DeleteDialog
                dialogTitle={"You really want to delete avatar?"}
                deleteAction={handleDelete}
            />
        </>
    )
}

export default AvatarDeleteForm;