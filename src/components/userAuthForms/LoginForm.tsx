import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';

import { Button, Container, Typography, Box, Avatar, Paper } from "@mui/material";
import { InputLabel, Checkbox } from "@mui/material";

import { EmailField, PasswordField } from "components/fields/userFields";
import { LoginFormValidation } from "../validations/userFormValidation";

import { useLazyQuery } from '@apollo/client';
import { USER_LOGIN } from "apollo/query/getUser";

import { IUserWithToken, IUserLogin } from "types/userTypes";

import styles from "./form.module.scss";

interface IUserData extends IUserLogin {
    rememberMe: boolean
}
interface IResponse {
    userLogin: IUserWithToken
}

const LoginForm: React.FC = () => {

    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const [fetchLogin, { loading }] = useLazyQuery<IResponse, IUserLogin>(USER_LOGIN, {
        onCompleted: (data) => {
            const { token, message } = data.userLogin;
            console.log(message);
            if (rememberMe) {
                localStorage.setItem("rememberMe", token);
            }
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
    } = useForm<IUserData>(LoginFormValidation);

    const onSubmit = (formdata: IUserData): void => {
        const { email, password, rememberMe } = formdata;
        setRememberMe(rememberMe);
        fetchLogin({ variables: { email, password } });
    };

    return (
        <Container maxWidth="xs" className={styles.form}>
            <Paper elevation={10} className={styles.form__paper}>
                <Typography className={styles.paper__title} component="h2">
                    {"Login"}
                </Typography>
                <Avatar className={styles.paper__avatar} />
                <Box
                    className={styles.paper__field}
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                >
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
                    <InputLabel>
                        <Controller
                            name="rememberMe"
                            control={control}
                            render={({ field }) => <Checkbox {...field} />}
                            defaultValue={false}
                        />
                        Remember me
                    </InputLabel>
                    <Button
                        disabled={!isValid}
                        type="submit"
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </Button>
                </Box>
            </Paper>
            <Typography className={styles.form__subtitle}>
                {"Don't have account?"}
            </Typography>
            <Button
                className={styles.form__submit_button}
                component={Link}
                to="/registration"
            >
                Registration
            </Button>
        </Container>
    );
};

export default LoginForm;
