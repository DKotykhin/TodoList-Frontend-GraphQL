import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import { AppBar, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import NavBarMenu from "./NavBarMenu";

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
            <Container maxWidth="xl" className={styles.navbar__container}>
                <Toolbar className={styles.navbar__tool}>
                    <Box className={styles.navbar__flex}>
                        <AssignmentTurnedInIcon sx={{ mr: 1 }} />
                        <Typography
                            component={RouterLink}
                            to={userName ? "/" : "/login"}
                            className={styles.navbar__logo}
                        >
                            TodoList
                        </Typography>
                    </Box>
                    {userName &&
                        <Box className={styles.navbar__flex}>
                            <Typography className={styles.navbar__name}>{userName}</Typography>
                            <Box>
                                <Tooltip title="Open settings" arrow>
                                    <IconButton onClick={handleOpenUserMenu}>
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
                        </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;
