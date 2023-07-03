import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { Button, Container, Typography, Avatar, Paper } from "@mui/material";
import { Box } from "@mui/system";

import { EmailField, NameField, PasswordField } from "components/fields/userFields/_index";
import { RegisterFormValidation } from "../../validations/userFormValidation";

import { useMutation } from '@apollo/client';
import { USER_REGISTER } from "apollo/mutation/mutateUser";
import { IUserWithToken, IUserRegister } from "types/userTypes";

import styles from "./form.module.scss";

interface IRegisterForm {
    userRegister: IUserWithToken;
}

const RegisterForm: React.FC = () => {

    const navigate = useNavigate();

    const [registerUser, { loading }] = useMutation<IRegisterForm, { query: IUserRegister }>(USER_REGISTER, {
        onCompleted: (data) => {
            const { token, message } = data.userRegister;
            console.log(message);
            sessionStorage.setItem("rememberMe", token);
            navigate("/");
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
    } = useForm<IUserRegister>(RegisterFormValidation);

    const onSubmit = (registerData: IUserRegister) => {
        const { name, email, password } = registerData;
        const validData = {
            name: name.trim(),
            email: email.trim(),
            password: password.trim(),
        };
        registerUser({ variables: { query: validData } });
    };

    return (
        <Container maxWidth="xs" className={styles.form}>
            <Paper elevation={10} className={styles.form__paper}>
                <Typography className={styles.form__title} component="h2">
                    {"Registration"}
                </Typography>
                <Avatar className={styles.form__avatar} />
                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <NameField
                        label='Name'
                        error={errors.name}
                        control={control} />
                    <EmailField
                        disabled={false}
                        error={errors.email}
                        control={control}
                    />
                    <PasswordField
                        name={"Password"}
                        error={errors.password}
                        control={control}
                    />
                    <Button
                        className={styles.form__submit_button}
                        disabled={!isValid}
                        type="submit"
                    >
                        {loading ? 'Loading...' : "Register"}
                    </Button>
                </Box>
            </Paper>
            <Typography className={styles.form__subtitle}>
                {"Already have account?"}
            </Typography>
            <Button className={styles.form__return_button} component={Link} to="/login">
                {"Login"}
            </Button>
        </Container>
    );
};

export default RegisterForm;
