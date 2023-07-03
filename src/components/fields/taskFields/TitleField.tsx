import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

import { Paper, TextField, InputLabel } from "@mui/material";

interface ITitleField {
    register: UseFormRegister<any>;
    error?: FieldError;
    value: string;
}

const TitleField: React.FC<ITitleField> = ({ register, error, value }) => {
    return (
        <Paper sx={{ mb: 4 }}>
            <InputLabel>Title</InputLabel>
            <TextField
                {...register("title", { required: true })}
                multiline
                maxRows={2}
                helperText={error?.message}
                error={error? true : false}
                variant="standard"
                placeholder="Add title..."
                defaultValue={value}
                fullWidth
                autoFocus
            />
        </Paper>
    );
};

export { TitleField };
