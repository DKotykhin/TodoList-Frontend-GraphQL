import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getToken } from "services/getToken";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const httpLink = createHttpLink({
    uri: BACKEND_URL,
});

const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    };
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
