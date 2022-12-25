import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import { Button, Container, Typography, Box, Avatar, Paper } from "@mui/material";
import { InputLabel, Checkbox } from "@mui/material";

import { EmailField, PasswordField } from "components/userFields";
import SnackBar from "components/snackBar/SnackBar";
import { LoginFormValidation } from "./userFormValidation";

import { IUserLogin, RequestError } from "types/userTypes";
import { useFetchLoginUserMutation } from "services/userServices";

import "./styleForm.scss";

interface IUserData extends IUserLogin {
    rememberMe: boolean
}

const LoginForm: React.FC = () => {

    const navigate = useNavigate();
    const [fetchLogin, { error, isLoading }] = useFetchLoginUserMutation();
    const loginError = (error as RequestError)?.data.message;

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<IUserData>(LoginFormValidation);


    const onSubmit = async (formdata: IUserData): Promise<void> => {
        const { email, password } = formdata;
        await fetchLogin({ email, password })
            .unwrap()
            .then(response => {
                console.log(response.message);
                const { token } = response;
                if (formdata.rememberMe) {
                    localStorage.setItem("rememberMe", token);
                }
                sessionStorage.setItem("rememberMe", token);
                navigate("/");
                reset();
            })
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
                        {isLoading ? 'Loading...' : 'Login'}
                    </Button>
                </Box>
                <SnackBar successMessage="" errorMessage={loginError} />
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
