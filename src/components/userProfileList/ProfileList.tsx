import React from "react";
import { useNavigate } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { format } from "date-fns";

import { Button, Typography, Container, Paper } from "@mui/material";

import DeleteForm from "./deleteForm/DeleteForm";
import ProfileForm from "./profileForm/ProfileForm";
import UserStatistic from "./userStatistic/UserStatistic";

import { GET_USER_BY_TOKEN } from "apollo/query/getUser";
import { IUser } from "types/userTypes";

import styles from "./profileList.module.scss";

interface IResponse {
    getUserByToken: IUser;
}

const ProfileList: React.FC = () => {

    const navigate = useNavigate();
    const { data } = useQuery<IResponse>(GET_USER_BY_TOKEN);

    return (
        <Container maxWidth="xs" className={styles.profile}>
            <Paper elevation={10} className={styles.profile__paper}>
                <Typography className={styles.profile__title} component="h2">
                    {data?.getUserByToken.name}
                </Typography>
                <Typography sx={{ pb: 1 }}>
                    {data && `Created: ${format(
                        new Date(data.getUserByToken.createdAt),
                        "dd LLL yyyy 'at' H:mm"
                    )}`}
                </Typography>
            </Paper>
            <UserStatistic/>
            <ProfileForm user={data?.getUserByToken} />
            <DeleteForm id={data?.getUserByToken._id} />
            <Button className={styles.profile__link} onClick={() => navigate("/")}>
                Main Page
            </Button>
        </Container>
    );
};

export default ProfileList;
