import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Layout from "layout/Layout";
import { withAuth } from "hocs/withAuth";

import { AddTaskPage, HomePage, LoginPage, ProfilePage, RegistrationPage, Page404, ResetPasswordPage, SetNewPasswordPage, ChangePasswordPage, UpdateTaskPage } from "pages/_index";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={withAuth(HomePage)} />
            <Route path="registration" element={<RegistrationPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="reset" element={<ResetPasswordPage />} />
            <Route path="auth/reset/:token" element={<SetNewPasswordPage />} />
            <Route path="profile" element={withAuth(ProfilePage)} />
            <Route path="password" element={withAuth(ChangePasswordPage)} />
            <Route path="addtask" element={withAuth(AddTaskPage)} />
            <Route path="updatetask/:taskId" element={withAuth(UpdateTaskPage)} />
            <Route path="*" element={<Page404 />} />
        </Route>
    )
);
