import React from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { Button } from "@mui/material";
import { Box } from "@mui/system";

import { PasswordField } from "components/userFields";
import { PasswordFormValidation } from "../userFormValidation";

import { useMutation } from '@apollo/client';
import { USER_CONFIRM_PASSWORD } from "apollo/mutation/mutatePassword";

import { IPasswordResponse, IUserUpdate } from "types/userTypes";

import "../styleForm.scss";

interface IConfirmPassword {
    confirmStatus: (arg0: boolean) => void;
}

interface IPasswordData {
    currentpassword: string
}
interface IResponse {
    userConfirmPassword: IPasswordResponse;
}

const ConfirmPassword: React.FC<IConfirmPassword> = ({ confirmStatus }) => {

    const [confirmPassword, { loading }] = useMutation<IResponse, IUserUpdate>(USER_CONFIRM_PASSWORD, {
        onCompleted: (data) => {
            const { status, message } = data.userConfirmPassword;
            console.log(message);
            if (status) {
                confirmStatus(status)
            } else {
                toast.error(message);
            }
        },
        onError: (err) => {
            toast.error(err.message);
        }
    });

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<IPasswordData>(PasswordFormValidation);

    const onSubmit = (data: IPasswordData) => {
        const { currentpassword } = data;
        confirmPassword({ variables: { password: currentpassword } });
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
                    name={"Current password"}
                    error={errors.currentpassword}
                    control={control}
                />
                <Button
                    disabled={!isValid}
                    className="form submit_button"
                    type="submit"
                >
                    {loading ? 'Loading...' : "Confirm password"}
                </Button>
            </Box>
        </>
    )
}

export default ConfirmPassword;
