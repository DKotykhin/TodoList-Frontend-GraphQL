import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Layout from "components/layout/Layout";
import { RequireAuth } from "hocs/RequireAuth";

import HomePage from "pages/HomePage";
import RegistrationPage from "pages/RegistrationPage";
import LoginPage from "pages/LoginPage";
import ResetPasswordPage from "pages/ResetPasswordPage";
import SetNewPasswordPage from "pages/SetNewPasswordPage";
import ProfilePage from "pages/ProfilePage";
import ChangePasswordPage from "pages/ChangePasswordPage";
import AddTaskPage from "pages/AddTaskPage";
import UpdateTaskPage from "pages/UpdateTaskPage";
import Page404 from "pages/Page404";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<RequireAuth children={<HomePage />} />} />
            <Route path="registration" element={<RegistrationPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="reset" element={<ResetPasswordPage />} />
            <Route path="auth/reset/:token" element={<SetNewPasswordPage />} />
            <Route path="profile" element={<RequireAuth children={<ProfilePage />} />} />
            <Route path="password" element={<RequireAuth children={<ChangePasswordPage />} />} />
            <Route path="addtask" element={<RequireAuth children={<AddTaskPage />} />} />
            <Route path="updatetask/:taskId" element={<RequireAuth children={<UpdateTaskPage />} />} />
            <Route path="*" element={<Page404 />} />
        </Route>
    )
);
