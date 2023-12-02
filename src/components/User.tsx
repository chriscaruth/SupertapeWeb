import { useAuth0 } from "@auth0/auth0-react";
import { faArrowRightFromBracket, faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User as UserComponent } from "@nextui-org/react";

export const User = () => {
    const { logout, isAuthenticated, user } = useAuth0();

    return (isAuthenticated && user &&
        <Dropdown backdrop="blur">
            <DropdownTrigger>
                <UserComponent
                    className="cursor-pointer"
                    name={user.name}
                    description={user.email}
                    avatarProps={{
                        src: user.picture
                    }}
                />
            </DropdownTrigger>
            <DropdownMenu className="w-72">
                <DropdownItem startContent={<FontAwesomeIcon icon={faGear} />}>
                    Settings
                </DropdownItem>
                <DropdownItem 
                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} 
                    startContent={<FontAwesomeIcon icon={faArrowRightFromBracket} />} 
                    className="text-danger" 
                    color="danger"
                >
                    Logout
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>           
    );
}