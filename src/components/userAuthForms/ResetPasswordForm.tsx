import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { Button, Container, Typography, Box, Avatar, Paper } from "@mui/material";

import { EmailField } from "components/fields/userFields/_index";
import { ResetPasswordFormValidation } from 'validations/userFormValidation';

import { useMutation } from '@apollo/client';
import { USER_RESET_PASSWORD } from "apollo/mutation/mutateUser";

import { IUserUpdate, IResetPasswordResponse } from "types/userTypes";

import styles from "./form.module.scss";

interface IResponse {
    userResetPassword: IResetPasswordResponse;
}

const ResetPasswordForm: React.FC = () => {

    const navigate = useNavigate();

    const [resetPassword, { loading }] = useMutation<IResponse, IUserUpdate>(USER_RESET_PASSWORD, {
        onCompleted: (data) => {
            const { message } = data.userResetPassword;
            toast.success(message);
            navigate("/login");
            reset();
        },
        onError: (err) => {
            toast.error(err.message);
        }
    });

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<{ email: string }>(ResetPasswordFormValidation);

    const onSubmit = (data: { email: string }): void => {
        const { email } = data;
        resetPassword({ variables: { email: email.trim() } });
    };

    return (
        <Container maxWidth="xs" className={styles.form}>
            <Paper elevation={10} className={styles.form__paper}>
                <Typography className={styles.form__title} component="h2">
                    {"Reset Password Form"}
                </Typography>
                <Avatar className={styles.form__avatar} />
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Typography className={styles.form__reset_subtitle}>
                        {"Put your email for sending reset password link"}
                    </Typography>
                    <EmailField
                        disabled={false}
                        error={errors.email}
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
            <Typography className={styles.form__subtitle}>
                {"Don't have account?"}
            </Typography>
            <Button
                className={styles.form__return_button}
                component={Link}
                to="/registration"
            >
                Registration
            </Button>
        </Container>
    );
};

export default ResetPasswordForm;