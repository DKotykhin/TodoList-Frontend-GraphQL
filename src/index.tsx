import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from "react-redux";

import { ApolloProvider } from '@apollo/client';
import client from 'apollo/client';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from "@mui/material/styles";

import store from "./store/store";
import { router } from './App';

import './index.scss';

const theme = createTheme({
    palette: {
        primary: {
            main: "#00a1b6",
        },
    },
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <RouterProvider router={router} />
            </ThemeProvider>
        </ApolloProvider>
    </Provider>
);