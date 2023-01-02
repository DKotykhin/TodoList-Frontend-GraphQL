import React from "react";
import { useNavigate } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { format } from "date-fns";

import { Button, Typography, Container, Paper } from "@mui/material";

import DeleteForm from "../userDeleteForm/DeleteForm";
import ProfileForm from "../userProfileForm/ProfileForm";

import { GET_USER_BY_TOKEN } from "apollo/query/getUser";

import "./profilelist.scss";

const ProfileList: React.FC = () => {

    const navigate = useNavigate();
    const { data } = useQuery(GET_USER_BY_TOKEN);

    return (
        <Container maxWidth="xs" className="profile">
            <Paper elevation={10}>
                <Typography className="profile title" component="h2">
                    {data?.getUserByToken.name}
                </Typography>
                <Typography sx={{ pb: 1 }}>
                    {data && `Created: ${format(
                        new Date(data.getUserByToken.createdAt),
                        "dd LLL yyyy 'at' H:mm"
                    )}`}
                </Typography>
            </Paper>
            <ProfileForm user={data.getUserByToken} />
            <DeleteForm id={data?.getUserByToken._id} />
            <Button sx={{ m: 6 }} onClick={() => navigate("/")}>
                Main Page
            </Button>
        </Container>
    )
};

export default ProfileList;
