import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Layout from "../components/layout/Layout";
import { NotFound } from "../pages/NotFound";
import { Dashboard } from "../pages/Dashboard";
import { Assets } from "../pages/Assets";

export enum RouteName {
    Dashboard = 'Dashboard',
    Assets = 'Assets'
}

const ROUTING_TABLE: Record<RouteName, string> = {
    [RouteName.Dashboard]: "/",
    [RouteName.Assets]: "/assets"
}

export const path = (name: RouteName) => {
    return ROUTING_TABLE[name];
}

export const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
            <Layout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        {
            path: path(RouteName.Dashboard),
            element: <Dashboard />
        },
        {
            path: path(RouteName.Assets),
            element: <Assets />
        }
      ]
    },
]);