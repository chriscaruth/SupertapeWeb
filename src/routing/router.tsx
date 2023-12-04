import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Layout from "../components/layout/Layout";
import { NotFound } from "../pages/NotFound";
import { Dashboard } from "../pages/Dashboard";
import { Assets } from "../pages/assets/Assets";
import { AssetsEdit } from "../pages/assets/AssetsEdit";

export enum RouteName {
    Dashboard = 'Dashboard',
    Assets = 'Assets',
    AssetsEdit = 'AssetsEdit'
}

const ROUTING_TABLE: Record<RouteName, string> = {
    [RouteName.Dashboard]: "/",
    [RouteName.Assets]: "/assets",
    [RouteName.AssetsEdit]: "/assets/:assetId"
}

export const path = (name: RouteName, params: Record<string, string | number | bigint> = {}) => {
    let path = ROUTING_TABLE[name];

    for (const [key, value] of Object.entries(params)) {
        path = path.replace(`:${key}`, value.toString());
    }

    return path;
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
        },
        {
            path: path(RouteName.AssetsEdit),
            element: <AssetsEdit />
        }
      ]
    },
]);