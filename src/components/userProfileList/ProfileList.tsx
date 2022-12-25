import React from "react";
import { useNavigate } from "react-router-dom";

import { format } from "date-fns";
import { Button, Typography, Container, Paper } from "@mui/material";

import DeleteForm from "../userDeleteForm/DeleteForm";
import ProfileForm from "../userProfileForm/ProfileForm";

import { useFetchUserByTokenQuery } from "services/userServices";

import "./profilelist.scss";

const ProfileList: React.FC = () => {

    const navigate = useNavigate();
    const { data } = useFetchUserByTokenQuery();

    return (
        <Container maxWidth="xs" className="profile">
            <Paper elevation={10}>
                <Typography className="profile title" component="h2">
                    {data?.name}
                </Typography>
                <Typography sx={{ pb: 1 }}>
                    {data && `Created: ${format(
                        new Date(data.createdAt),
                        "dd LLL yyyy 'at' H:mm"
                    )}`}
                </Typography>
            </Paper>
            <ProfileForm user={data} />
            <DeleteForm />
            <Button sx={{ m: 6 }} onClick={() => navigate("/")}>
                Main Page
            </Button>
        </Container>
    )
};

export default ProfileList;
