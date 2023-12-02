import { useAuth0 } from '@auth0/auth0-react';
import { ReactElement } from 'react';

interface IProtectedRoute {
    children: ReactElement
}

export const ProtectedRoute = ({ children } : IProtectedRoute) => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        loginWithRedirect();
        return null;
    }

    return children;
};