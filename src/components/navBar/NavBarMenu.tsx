import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
// import client from "apollo/client";
import { useApolloClient } from "@apollo/client";

import { useAppDispatch } from "store/reduxHooks";
import { logout } from "store/userSlice";

const settings = ["Profile", "Change password", "Logout"];

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
            {settings.map((setting) => (
                <Typography
                    key={setting}
                    sx={{
                        padding: "5px 15px",
                        cursor: "pointer",
                        color: "#808080",
                        ":hover": { color: "#2b2b2b" },
                    }}
                    onClick={() => handleSettingMenu(setting)}
                >
                    {setting}
                </Typography>
            ))}
        </>
    );
};
export default NavBarMenu;
