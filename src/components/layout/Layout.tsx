import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

// useEffect(() => {
//     const getUserMetadata = async () => {
//         const domain = import.meta.env.VITE_AUTH0_DOMAIN;

//         try {
//             const accessToken = await getAccessTokenSilently({
//                 authorizationParams: {
//                     audience: `https://${domain}/api/v2/`
//                 },
//             });
//             console.log(accessToken);
//         } catch (e) {

//         }
//     };

//     getUserMetadata();
// }, [getAccessTokenSilently, user?.sub]);

const Layout = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 ml-80 p-6 overflow-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;