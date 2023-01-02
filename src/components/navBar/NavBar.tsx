import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { AppBar, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import NavBarMenu from "./NavBarMenu";

// import { useQuery } from "@apollo/client";
// import { GET_USER_BY_TOKEN } from "apollo/query/getUser";
import { selectUser } from "store/selectors";
import { useAppSelector } from "store/hook";

import "./navBar.scss";

const Base_URL = process.env.REACT_APP_UPLOAD_URL;

const NavBar: React.FC = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { avatarURL, name } = useAppSelector(selectUser);
    // console.log('name:', name);
    // console.log('avatarURL:', avatarURL);
        
    // const { data } = useQuery(GET_USER_BY_TOKEN, {
    //     onCompleted: () => {
    //         console.log('useQuery completed')
    //     }
    // });    

    // const userAvatarURL =
    //     data?.getUserByToken.avatarURL ? Base_URL + data.getUserByToken.avatarURL : "/";
    // const userName = data?.getUserByToken.name;
    const userAvatarURL =
        avatarURL ? Base_URL + avatarURL : "/";
    const userName = name;

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl" className="navbar">
                <Toolbar disableGutters>
                    <AssignmentTurnedInIcon sx={{ mr: 1 }} />
                    <Typography
                        component={RouterLink}
                        to="/"
                        className="navbar link_text"
                    >
                        TodoList
                    </Typography>
                    {userName &&
                        <>
                            <Typography sx={{ mr: 3 }}>{userName}</Typography>
                            <Box>
                                <Tooltip title="Open settings" arrow>
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar
                                            alt={userName || "TodoList"}
                                            src={userAvatarURL}
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: "45px" }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <Box
                                        sx={{ display: "block" }}
                                        onClick={handleCloseUserMenu}
                                    >
                                        <NavBarMenu />
                                    </Box>
                                </Menu>
                            </Box>
                        </>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;
