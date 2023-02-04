import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import { useApolloClient } from "@apollo/client";

import { useAppDispatch } from "store/reduxHooks";
import { logout } from "store/userSlice";

import styles from "./navBar.module.scss";

const menu = ["Profile", "Change password", "Logout"];

const NavBarMenu = () => {    
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const client = useApolloClient();

    const handleSettingMenu = (event: string): void => {
        switch (event) {
            case "Profile":                
                navigate("/profile");
                break;
            case "Change password":
                navigate("/password");
                break;
            case "Logout":                
                dispatch(logout());
                client.clearStore();
                client.cache.reset();                
                sessionStorage.removeItem("rememberMe");
                localStorage.removeItem("rememberMe");
                navigate("/login");
                break;
            default:
                navigate("/");
        }
    };

    return (
        <>
            {menu.map((item) => (
                <Typography
                    key={item}
                    className={styles.navbar__menu}
                    onClick={() => handleSettingMenu(item)}
                >
                    {item}
                </Typography>
            ))}
        </>
    );
};
export default NavBarMenu;
