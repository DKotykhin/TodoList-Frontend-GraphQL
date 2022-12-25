import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@mui/material";
import { Box } from "@mui/system";

import { PasswordField } from "components/userFields";
import SnackBar from "components/snackBar/SnackBar";
import { NewPasswordFormValidation } from "../userFormValidation";
import { useFetchUpdateUserMutation } from "services/userServices";

import "../styleForm.scss";

interface IPasswordData {
    newpassword: string;
    confirmpassword: string
}

const ChangePassword: React.FC = () => {

    const [loaded, setLoaded] = useState('');
    const [error, setError] = useState('');

    const [updatePassword, { isLoading }] = useFetchUpdateUserMutation()

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IPasswordData>(NewPasswordFormValidation);

    const onSubmit = async (data: IPasswordData) => {
        setError('');
        setLoaded('');
        if (data.newpassword === data.confirmpassword) {
            const { newpassword } = data;
            await updatePassword({ password: newpassword })
                .unwrap()
                .then(response => {
                    console.log(response.message);
                    setLoaded('Password successfully changed!');
                    reset();
                })
                .catch((error: { data: { message: string }}) => {
                    console.log(error.data.message);
                    setError(error.data.message);
                })
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
                    {isLoading ? 'Loading...' : "Change password"}
                </Button>
            </Box>
            <SnackBar successMessage={loaded} errorMessage={error} />
        </>
    );
}

export default ChangePassword;