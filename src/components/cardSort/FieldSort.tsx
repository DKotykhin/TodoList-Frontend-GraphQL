import React from "react";
import { Stack, Chip } from "@mui/material";

interface IFieldSort {
    onSelect: (arg0: string) => void;
    value: string;
}

const sortItems = ["created", "deadline", "title"];

const FieldSort: React.FC<IFieldSort> = ({ onSelect, value }) => {

    const handleSelect = (label: string) => {
        onSelect(label);
    };

    return (
        <Stack
            direction="row"
            spacing={3}
            sx={{
                display: "flex",
                flexWrap: "wrap",
                mt: 2,
                justifyContent: "center",
            }}
        >
            {sortItems.map((item) => (
                <Chip
                    key={item}
                    sx={{ mb: 2 }}
                    variant="filled"
                    color={item === value ? "primary" : "default"}
                    label={item}
                    onClick={() => handleSelect(item)}
                />
            ))}
        </Stack>
    );
};

export default FieldSort;
