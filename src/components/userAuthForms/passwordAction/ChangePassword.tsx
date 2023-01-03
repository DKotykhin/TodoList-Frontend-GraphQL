import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from '@apollo/client';

import { Button } from "@mui/material";
import { Box } from "@mui/system";

import { PasswordField } from "components/userFields";
import SnackBar from "components/snackBar/SnackBar";
import { NewPasswordFormValidation } from "../userFormValidation";

import { USER_UPDATE_PASSWORD } from "apollo/mutation/mutatePassword";

import "../styleForm.scss";

interface IPasswordData {
    newpassword: string;
    confirmpassword: string
}

const ChangePassword: React.FC = () => {

    const [loaded, setLoaded] = useState('');
    const [error, setError] = useState('');

    const [updatePassword, { loading }] = useMutation(USER_UPDATE_PASSWORD, {
        onCompleted: (data) => {
            const { message } = data.userUpdatePassword;
            console.log(message);
            setLoaded('Password successfully changed!');
            reset();
        },
        onError: (err) => {
            console.log(err.message);
            setError(err.message);
        }
    });

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IPasswordData>(NewPasswordFormValidation);

    const onSubmit = (data: IPasswordData) => {
        setError('');
        setLoaded('');
        if (data.newpassword === data.confirmpassword) {
            const { newpassword } = data;            
            updatePassword({ variables: { password: newpassword } });
        } else {
            console.log("Passwords don't match");
            setError("Passwords don't match");
        }
    };

    return (
        <>
            <Box
                className="form field"
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <PasswordField
                    name={"New password"}
                    error={errors.newpassword}
                    control={control}
                />
                <PasswordField
                    name={"Confirm password"}
                    error={errors.confirmpassword}
                    control={control}
                />
                <Button
                    disabled={!isValid}
                    className="form submit_button"
                    type="submit"
                >
                    {loading ? 'Loading...' : "Change password"}
                </Button>
            </Box>
            <SnackBar successMessage={loaded} errorMessage={error} />
        </>
    );
}

export default ChangePassword;