import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { ApolloProvider } from '@apollo/client';

import CssBaseline from '@mui/material/CssBaseline';

import client from 'apollo/client';
import store from "./store/store";
import App from './App';

import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <CssBaseline />
      <App />
    </ApolloProvider>
  </Provider>
);