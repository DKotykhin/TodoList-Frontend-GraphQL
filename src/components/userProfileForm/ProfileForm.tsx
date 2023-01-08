import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { Button, Paper } from "@mui/material";
import { Box } from "@mui/system";

import { ProfileFormValidation } from "./ProfileFormValidation";
import AvatarUploadForm from "./AvatarUploadForm";
import { EmailField, NameField } from "components/userFields";

import { useMutation } from '@apollo/client';
import { USER_UPDATE_NAME } from "apollo/mutation/mutateUser";

import { IUser, IUserUpdate } from "types/userTypes";

const ProfileForm: React.FC<{ user?: IUser }> = ({ user }) => {
    
    const [updateUser, { loading }] = useMutation(USER_UPDATE_NAME, {
        onCompleted: (data) => {
            toast.success(data.userUpdateName.message)
        },
        onError: (err) => {            
            toast.error(err.message);
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
        const { name } = updateData;
        if (name !== user?.name) {            
            updateUser({ variables: { name } });
        } else toast.warn('The same name!');
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
            </Box>
        </Paper>
    )
}

export default ProfileForm;