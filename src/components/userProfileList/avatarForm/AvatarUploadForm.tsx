import React, { useState } from 'react';
import { useForm, FieldValues } from "react-hook-form";
import { toast } from 'react-toastify';

import { Avatar, Box, Tooltip, IconButton } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import FileUploadIcon from '@mui/icons-material/FileUpload';

import AvatarDeleteForm from './AvatarDeleteForm';

import { useMutation } from '@apollo/client';
import { USER_UPLOAD_AVATAR_URL } from 'apollo/mutation/mutateUser';

import { UploadAvatar } from 'services/uploadAvatar';

import { IAvatarResponse, IUser, IUserUpdate } from 'types/userTypes';

interface IResponse {
    uploadAvatar: IAvatarResponse;
}

const checkFileType = (type: string): boolean => {
    return (type === 'image/jpeg' || type === 'image/png' || type === 'image/webp');
};
const Base_URL = process.env.REACT_APP_UPLOAD_URL;

const AvatarUploadForm: React.FC<{ user?: IUser }> = ({ user }) => {

    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState('');
    const { register, reset, handleSubmit } = useForm();

    const userAvatarURL = user?.avatarURL ? Base_URL + user.avatarURL : "/";

    const [loadAvatarURL] = useMutation<IResponse, IUserUpdate>(USER_UPLOAD_AVATAR_URL, {
        update(cache) {
            cache.modify({
                fields: {
                    getUserByToken() { }
                }
            })
        },
        onCompleted: (data) => {
            console.log(data.uploadAvatar.message)
        },
        onError: (err) => {
            toast.error(err.message)
        }
    })

    const onChange = (e: any) => {
        setFileName(e.target.files[0].name);
        const isApproved = checkFileType(e.target.files[0].type);
        if (!isApproved) toast.warn("Incorrect file type");
        if (e.target.files[0].size > 1024000) toast.warn("File shoul be less then 1Mb");
    };
    const onReset = () => {
        reset();
        setFileName("");
    };

    const onSubmit = (data: FieldValues) => {
        const isApproved = checkFileType(data.avatar[0].type);
        if (!isApproved) {
            toast.error("Can't upload this type of file");
        } else if (data.avatar[0].size > 1024000) {
            toast.error("Too large file to upload!");
        } else if (data.avatar.length) {
            const formData = new FormData();
            formData.append("avatar", data.avatar[0], data.avatar[0].name);
            UploadAvatar(formData)
                .then((response) => {
                    toast.success(response.message);
                    loadAvatarURL({ variables: { avatarURL: response.avatarURL } });
                    setFileName("");
                    reset();
                })
                .catch((error) => {
                    toast.error(error.response.data.message || error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            toast.warn("No File in Avatar Field");
        }
    }

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Box sx={{ cursor: 'pointer' }} component="label" onChange={onChange}>
                <Tooltip title="Change Avatar" placement="left" arrow>
                    <Avatar
                        sx={{ width: 150, height: 150, margin: '0 auto' }}
                        src={userAvatarURL}
                    />
                </Tooltip>
                <Box
                    {...register("avatar")}
                    component="input"
                    type="file"
                    hidden
                />
            </Box>
            {loading ? 'Loading...' : fileName ? (
                <>
                    {fileName}
                    <IconButton onClick={onReset}>
                        <Tooltip title="Cancel" placement="top" arrow>
                            <CloseIcon />
                        </Tooltip>
                    </IconButton>
                    <IconButton type="submit">
                        <Tooltip title="Upload" placement="top" arrow>
                            <FileUploadIcon color='primary' />
                        </Tooltip>
                    </IconButton>
                </>
            ) : <AvatarDeleteForm user={user} />}
        </Box>
    )
}

export default AvatarUploadForm