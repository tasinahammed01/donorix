import { useState } from "react";
import { motion } from "framer-motion";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-[90vh]">
      {/* Mobile Hamburger */}
      <motion.div
  className={`md:hidden fixed top-0 z-60`}
  animate={{ x: ["0%", "20%", "0%"] }} // moves from left to right and back
  transition={{
    duration: 2, // total time for one cycle
    repeat: Infinity, // loop forever
    repeatType: "loop", // loop smoothly
    ease: "easeInOut",
  }}
>
  <button
    onClick={() => setSidebarOpen(!sidebarOpen)}
    className="text-gray-900 bg-gray-200 p-2 rounded shadow-md"
  >
    {sidebarOpen ? (
      <HiChevronDoubleLeft size={15} />
    ) : (
      <HiChevronDoubleRight size={15} />
    )}
  </button>
</motion.div>

      {/* Sidebar */}
      <div
        className={`fixed z-50 top-0 left-0 h-full bg-gray-900 text-white flex flex-col justify-between
          w-64 transform transition-transform duration-300
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-[95%]"
          } md:translate-x-0 md:relative
        `}
      >
        <div>
          <h1 className="text-2xl font-bold p-4 mt-5">Admin Panel</h1>
          <nav className="flex flex-col gap-2 p-4">
            <NavLink
              to="/dashboard/admin/users"
              className={({ isActive }) =>
                `p-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
              }
            >
              User List
            </NavLink>
            <NavLink
              to="/dashboard/admin/donors"
              className={({ isActive }) =>
                `p-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
              }
            >
              Donor List
            </NavLink>
            <NavLink
              to="/dashboard/admin/recipients"
              className={({ isActive }) =>
                `p-2 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
              }
            >
              Recipient List
            </NavLink>
          </nav>
        </div>

        {/* Bottom section */}
        <div className="p-4 border-t border-gray-700">
          <Link to="/dashboard/admin/profile">
            <button className="w-full text-left p-2 rounded hover:bg-gray-700">
              Profile
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left p-2 rounded bg-red-600 mt-2"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Content Area */}
      <div
        className={`flex-1 p-6 overflow-y-auto transition-all duration-300 ${
          sidebarOpen ? "md:ml-4" : "ml-0"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
