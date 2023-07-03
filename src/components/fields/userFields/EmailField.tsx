import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";

import {
    Box,
    Input,
    InputLabel,
    FormControl,
    FormHelperText,
} from "@mui/material";

import styles from './field.module.scss';

interface IEmailField {
    disabled: boolean;
    error?: FieldError;
    control: Control<any>;
}

const EmailField: React.FC<IEmailField> = ({ disabled, error, control }) => {
    return (
        <Box className={styles.field}>
            <InputLabel>Email</InputLabel>
            <FormControl>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            type="email"
                            disabled={disabled}
                            placeholder="type email..."
                            autoComplete="email"
                            error={error ? true : false}
                        />
                    )}
                />
                <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
        </Box>
    );
};

export { EmailField };
