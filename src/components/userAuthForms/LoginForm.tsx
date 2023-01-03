import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useLazyQuery } from '@apollo/client';

import { Button, Container, Typography, Box, Avatar, Paper } from "@mui/material";
import { InputLabel, Checkbox } from "@mui/material";

import { EmailField, PasswordField } from "components/userFields";
import SnackBar from "components/snackBar/SnackBar";
import { LoginFormValidation } from "./userFormValidation";

import { USER_LOGIN } from "apollo/query/getUser";
import { IUserLogin } from "types/userTypes";

import "./styleForm.scss";

interface IUserData extends IUserLogin {
    rememberMe: boolean
}

const LoginForm: React.FC = () => {

    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    
    const [fetchLogin, { loading, error }] = useLazyQuery(USER_LOGIN, {
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
            console.log(err.message);
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
        <Container maxWidth="xs" className="form">
            <Paper elevation={10} className="form paper">
                <Typography className="form title" component="h2">
                    {"Login"}
                </Typography>
                <Avatar className="form avatar" />
                <Box
                    className="form field"
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
                <SnackBar successMessage="" errorMessage={error?.message || ""} />
            </Paper>
            <Typography className="form subtitle">
                {"Don't have account?"}
            </Typography>
            <Button
                className="form submit_button"
                component={Link}
                to="/registration"
            >
                Registration
            </Button>
        </Container>
    );
};

export default LoginForm;
