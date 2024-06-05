import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 ml-80 overflow-auto">
        <Outlet />
      </div>
      <ToastContainer position="bottom-center" newestOnTop />
    </div>
  );
};

export default Layout;
