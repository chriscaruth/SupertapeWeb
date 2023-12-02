import { User } from "../User";
import { RouteName } from "../../routing/router";
import { PageLink } from "./PageLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faTableColumns } from "@fortawesome/free-solid-svg-icons";

export const Sidebar = () => {
    return (
        <div className="w-80 bg-white p-6 fixed h-full">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Supertape</h2>
            </div>
            <div className="space-y-2">
                <PageLink route={RouteName.Dashboard} icon={<FontAwesomeIcon icon={faTableColumns} />} />
                <PageLink route={RouteName.Assets} icon={<FontAwesomeIcon icon={faBuilding} />} />
            </div>
            <div className="absolute bottom-0 left-0 p-6 w-full">
                <div className="flex items-center">
                    <User />
                </div>
            </div>
        </div>
    );
}