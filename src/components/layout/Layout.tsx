import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

const Layout = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 ml-80 overflow-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;