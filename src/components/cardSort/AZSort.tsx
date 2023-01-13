import React, { useState } from "react";
import { Stack, Chip } from "@mui/material";

interface IAZSort {
    onSelect: (arg0: number) => void;
    sortValue: number;
}

const sortItems = ["A-z", "Z-a"];

const AZSort: React.FC<IAZSort> = ({ onSelect, sortValue }) => {

    const [value, setValue] = useState(sortValue === -1 ? "A-z" : "Z-a");

    const handleSelect = (label: string) => {
        setValue(label)
        onSelect(label === "A-z" ? -1 : 1);
    };

    return (
        <Stack
            direction="row"
            spacing={3}
            sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                mb: 2
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

export default AZSort;
