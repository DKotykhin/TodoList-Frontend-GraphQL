import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Layout from "components/layout/Layout";
import { RequireAuth } from "hocs/RequireAuth";

import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import ProfilePage from "pages/ProfilePage";
import RegistrationPage from "pages/RegistrationPage";
import Page404 from "pages/Page404";
import ChangePasswordPage from "pages/ChangePasswordPage";
import UpdateTaskPage from "pages/UpdateTaskPage";
import AddTaskPage from "pages/AddTaskPage";


export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<RequireAuth children={<HomePage />} />} />
            <Route path="addtask" element={<RequireAuth children={<AddTaskPage />} />} />
            <Route path="updatetask/:taskId" element={<RequireAuth children={<UpdateTaskPage />} />} />
            <Route path="profile" element={<RequireAuth children={<ProfilePage />} />} />
            <Route path="password" element={<RequireAuth children={<ChangePasswordPage />} />} />
            <Route path="registration" element={<RegistrationPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<Page404 />} />
        </Route>
    )
);
