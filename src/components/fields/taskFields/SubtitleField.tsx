import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import { Paper, TextField, InputLabel } from "@mui/material";

interface ISubtitleField {
    register: UseFormRegister<any>;
    value?: string;
}

const SubtitleField: React.FC<ISubtitleField> = ({ register, value }) => {
    return (
        <Paper sx={{ my: 4 }}>
            <InputLabel>Subtitle</InputLabel>
            <TextField
                {...register("subtitle")}
                multiline
                maxRows={2}
                variant="standard"
                placeholder="Add subtitle..."
                fullWidth
                defaultValue={value}
            />
        </Paper>
    );
};

export { SubtitleField };
