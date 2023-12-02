import { NavLink } from "react-router-dom";
import { RouteName, path } from "../../routing/router";
import { ReactNode } from "react";

interface IPageLink {
    route: RouteName;
    icon: ReactNode
}

export const PageLink = ({ route, icon } : IPageLink) => {
    return (
        <NavLink
            to={path(route)}
            className={({ isActive }) =>
                [
                    "flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-slate-200",
                    isActive ? "bg-slate-100" : null
                ].join(" ")
            }
        >
            <div className="flex items-center text-gray-700">
                <span className="icon">{icon}</span>
                <span className="ml-3">{route}</span>
            </div>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">9</span>
        </NavLink>
    );
}