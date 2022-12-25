import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";

import { ProfileFormValidation } from "./ProfileFormValidation";
import AvatarUploadForm from "./AvatarUploadForm";
import { EmailField, NameField } from "components/userFields";

import { useFetchUpdateUserMutation } from "services/userServices";
import { IUser, IUserUpdate } from "types/userTypes";
import SnackBar from "components/snackBar/SnackBar";


const ProfileForm: React.FC<{ user?: IUser }> = ({ user }) => {
    const [updateError, setUpdateError] = useState('');

    const [updateUser, { data: updateData, isLoading }] = useFetchUpdateUserMutation();
    // const updateError = (error as RequestError)?.data.message;
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm(ProfileFormValidation);

    useEffect(() => {
        reset({ name: user?.name, email: user?.email });
    }, [reset, user?.name, user?.email]);

    const onSubmit = async (updateData: IUserUpdate) => {
        const { name } = updateData;
        if (name !== user?.name) {
            await updateUser({ name })
                .unwrap()
                .catch((error) => {
                    console.log(error.data.message);
                    setUpdateError(error.data.message);
                })

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
                    {isLoading ? 'Loading...' : 'Save name'}
                </Button>
                <SnackBar successMessage={updateData?.message || ''} errorMessage={updateError} />
            </Box>
        </Paper>
    )
}

export default ProfileForm;