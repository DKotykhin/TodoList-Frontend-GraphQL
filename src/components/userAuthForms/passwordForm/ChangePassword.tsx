import React from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { Button } from "@mui/material";
import { Box } from "@mui/system";

import { PasswordField } from "components/fields/userFields";
import { NewPasswordFormValidation } from "../../validations/userFormValidation";

import { useMutation } from '@apollo/client';
import { USER_UPDATE_PASSWORD } from "apollo/mutation/mutateUser";

import { IPasswordResponse, IUserUpdate } from "types/userTypes";

import styles from "./password.module.scss";

interface IPasswordData {
    newpassword: string;
    confirmpassword: string
}
interface IResponse {
    userUpdatePassword: IPasswordResponse;
}

const ChangePassword: React.FC = () => {

    const [updatePassword, { loading }] = useMutation<IResponse, IUserUpdate>(USER_UPDATE_PASSWORD, {
        onCompleted: (data) => {
            const { message, status } = data.userUpdatePassword;
            console.log(message);
            if (status) {
                toast.success('Password successfully changed!');
                reset();
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
        reset,
    } = useForm<IPasswordData>(NewPasswordFormValidation);

    const onSubmit = (data: IPasswordData) => {
        if (data.newpassword === data.confirmpassword) {
            const { newpassword } = data;
            updatePassword({ variables: { password: newpassword } });
        } else {
            toast.warn("Passwords don't match");
        }
    };

    return (
        <Box
            className={styles.form__field}
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
                className={styles.form__submit_button}
                type="submit"
            >
                {loading ? 'Loading...' : "Change password"}
            </Button>
        </Box>
    );
}

export default ChangePassword;