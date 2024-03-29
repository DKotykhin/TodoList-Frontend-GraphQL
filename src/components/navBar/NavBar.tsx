import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { AppBar, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip } from "@mui/material";
import { Box } from "@mui/system";

import NavBarMenu from "./NavBarMenu";
import { ReactComponent as Icon } from "images/svg/logo.svg";

import { userSelector } from "store/userSlice";
import { useAppSelector } from "store/reduxHooks";

import styles from "./navBar.module.scss";

const Base_URL = process.env.REACT_APP_UPLOAD_URL;

const NavBar: React.FC = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { avatarURL, name: userName } = useAppSelector(userSelector);

    const userAvatarURL = avatarURL ? Base_URL + avatarURL : "/";

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl" className={styles.navbar}>
                <Toolbar disableGutters>
                    <Icon className={styles.navbar__icon} />
                    <Typography
                        component={RouterLink}
                        to={userName ? "/" : "/login"}
                        className={styles.navbar__logo}
                    >
                        TodoList
                    </Typography>
                    {userName &&
                        <>
                            <Typography className={styles.navbar__name}>{userName}</Typography>
                            <Box>
                                <Tooltip title="Open settings" arrow>
                                    <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
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
                                    <Box onClick={handleCloseUserMenu}>
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
