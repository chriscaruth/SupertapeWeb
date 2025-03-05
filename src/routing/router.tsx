import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Layout from "../components/layout/Layout";
import { NotFound } from "../pages/NotFound";
import { Dashboard } from "../pages/Dashboard";
import { Assets } from "../pages/assets/Assets";
import { AssetsEdit } from "../pages/assets/AssetsEdit";
import Asset3DProvider from "../context/Asset3DContext";
import { Vendors } from "../pages/Vendors";
import { Catalog } from "../pages/Catalog";

export enum RouteName {
  Dashboard = "Dashboard",
  Assets = "Assets",
  AssetsEdit = "AssetsEdit",
  Vendors = "Vendors",
  Catalog = "Catalog",
}

const ROUTING_TABLE: Record<RouteName, string> = {
  [RouteName.Dashboard]: "/",
  [RouteName.Assets]: "/assets",
  [RouteName.AssetsEdit]: "/assets/:assetId",
  [RouteName.Vendors]: "/vendors",
  [RouteName.Catalog]: "/catalog",
};

export const path = (
  name: RouteName,
  params: Record<string, string | number | bigint> = {}
) => {
  let path = ROUTING_TABLE[name];

  for (const [key, value] of Object.entries(params)) {
    path = path.replace(`:${key}`, value.toString());
  }

  return path;
};

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
        element: <Dashboard />,
      },
      {
        path: path(RouteName.Assets),
        element: <Assets />,
      },
      {
        path: path(RouteName.AssetsEdit),
        element: (
          <Asset3DProvider>
            <AssetsEdit />
          </Asset3DProvider>
        ),
      },
      {
        path: path(RouteName.Vendors),
        element: <Vendors />,
      },
      {
        path: path(RouteName.Catalog),
        element: <Catalog />,
      },
    ],
  },
]);
