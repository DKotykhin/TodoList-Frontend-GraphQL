import React, { useState } from 'react';
import { toast } from 'react-toastify';

import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import ChildModal from "components/childModal/ChildModal";

import { useMutation } from '@apollo/client';
import { DELETE_AVATAR } from 'apollo/mutation/mutateUser';

import { IAvatarResponse, IUser } from 'types/userTypes';

import styles from './avatarForm.module.scss';

interface IResponse {
    deleteAvatar: IAvatarResponse;
};

const AvatarDeleteForm: React.FC<{ user?: IUser }> = ({ user }) => {

    const [openChildModal, setOpenChildModal] = useState(false);

    const [deleteAvatar, { loading }] = useMutation<IResponse, { _id: string | undefined }>(DELETE_AVATAR, {
        update(cache) {
            cache.modify({
                fields: {
                    getUserByToken() { }
                }
            });
        },
        onCompleted: (data) => toast.success(data.deleteAvatar.message),
        onError: (err) => toast.error(err.message)
    });

    const handleSubmit = () => {
        const avatarURL: string | undefined = user?.avatarURL;
        setOpenChildModal(false);
        if (avatarURL) {
            deleteAvatar({ variables: { _id: user?._id } });
        } else {
            toast.warn("Avatar doesn't exist");
        }
    };

    const handleClick = (): void => {
        setOpenChildModal(true);
    };
    const handleClose = (): void => {
        setOpenChildModal(false);
    };

    return (
        <>
            {loading ?
                <Typography className={styles.avatarForm__loading}>
                    Loading...
                </Typography> :
                <DeleteForeverIcon onClick={handleClick} className={styles.deleteForm__icon} />
            }
            <ChildModal
                open={openChildModal}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                title={'avatar'}
            />
        </>
    );
};

export default AvatarDeleteForm;