import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { Button, Container, Typography, Box, Avatar, Paper } from "@mui/material";

import { PasswordField } from "components/fields/userFields";
import { NewPasswordFormValidation } from "components/validations/userFormValidation";

import { useMutation } from '@apollo/client';
import { USER_SET_NEW_PASSWORD } from "apollo/mutation/mutateUser";

import { IPasswordResponse } from "types/userTypes";

import styles from "./form.module.scss";

interface IPasswordData {
    newpassword: string;
    confirmpassword: string
}

interface IResponse {
    userSetNewPassword: IPasswordResponse;
}

interface IUserSetPasswordInput {
    token: string,
    password: string,
}

const SetNewPasswordForm: React.FC = () => {

    const { token } = useParams();

    const navigate = useNavigate();

    const [setNewPassword, { loading }] = useMutation<IResponse, { query: IUserSetPasswordInput }>(USER_SET_NEW_PASSWORD, {
        onCompleted: (data) => {
            const { message } = data.userSetNewPassword;
            navigate("/login");
            toast.success(message);
            reset();
        },
        onError: (err) => {
            toast.error(err.message)
        }
    });

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IPasswordData>(NewPasswordFormValidation);

    const onSubmit = (data: IPasswordData): void => {
        if (data.newpassword === data.confirmpassword) {
            const { newpassword } = data;
            const validData = {
                password: newpassword.trim(),
                token: token || "",
            };
            setNewPassword({ variables: { query: validData } });
        } else {
            toast.warn("Passwords don't match");
        }
    };

    return (
        <Container maxWidth="xs" className={styles.form}>
            <Paper elevation={10} className={styles.form__paper}>
                <Typography className={styles.form__title} component="h2">
                    {"Set New Password Form"}
                </Typography>
                <Avatar className={styles.form__avatar} />
                <Box
                    component="form"
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
                        className={styles.form__submit_button}
                        disabled={!isValid}
                        type="submit"
                    >
                        {loading ? 'Loading...' : 'Send'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    )
}

export default SetNewPasswordForm;