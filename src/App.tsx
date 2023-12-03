
import { Auth0Provider } from "@auth0/auth0-react";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router-dom";
import { router } from './routing/router';
import './main.css';
import { QueryClient, QueryClientProvider } from "react-query";
import ServiceProvider from "./context/ServiceContext";

const queryClient = new QueryClient();

export const App = () => {
    return (
        <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_AUTH0_CLIENTID}
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: import.meta.env.VITE_AUTH0_AUDIENCE
            }}
        >
            <QueryClientProvider client={queryClient}>
                <ServiceProvider>
                    <NextUIProvider>
                        <RouterProvider router={router} />
                    </NextUIProvider>
                </ServiceProvider>
            </QueryClientProvider>
        </Auth0Provider>
    );
};
