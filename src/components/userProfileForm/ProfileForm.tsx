import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from '@apollo/client';

import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";

import { ProfileFormValidation } from "./ProfileFormValidation";
import AvatarUploadForm from "./AvatarUploadForm";
import { EmailField, NameField } from "components/userFields";
import SnackBar from "components/snackBar/SnackBar";

import { USER_UPDATE_NAME } from "apollo/mutation/mutateUser";
import { IUser, IUserUpdate } from "types/userTypes";

const ProfileForm: React.FC<{ user?: IUser }> = ({ user }) => {
    const [updateError, setUpdateError] = useState('');

    const [updateUser, { data, loading }] = useMutation(USER_UPDATE_NAME, {
        onError: (err) => {
            console.log(err.message);
            setUpdateError(err.message);
        }
    });

    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm(ProfileFormValidation);

    useEffect(() => {
        reset({ name: user?.name, email: user?.email });
    }, [reset, user?.name, user?.email]);

    const onSubmit = (updateData: IUserUpdate) => {
        setUpdateError('');
        const { name } = updateData;
        if (name !== user?.name) {            
            updateUser({ variables: { name } });
        } else setUpdateError('The same name!');
    };

    return (
        <Paper elevation={10} sx={{ my: 2 }}>
            <AvatarUploadForm user={user} />
            <Box
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                noValidate
                autoComplete="off"
            >
                <EmailField
                    disabled={true}
                    error={errors.email}
                    control={control}
                />
                <Box sx={{ my: 4 }}>
                    <NameField
                        label="Change your name"
                        error={errors.name}
                        control={control}
                    />
                </Box>
                <Button
                    type="submit"
                    variant="outlined"
                    sx={{ m: 3 }}
                >
                    {loading ? 'Loading...' : 'Save name'}
                </Button>
                <SnackBar successMessage={data?.userUpdateName.message || ''} errorMessage={updateError} />
            </Box>
        </Paper>
    )
}

export default ProfileForm;