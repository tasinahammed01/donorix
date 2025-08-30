import { useState, useContext } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { AuthContext } from "../providers/AuthProvider";

const roleConfig = {
  admin: {
    dashboardLabel: "Admin Dashboard",
    dashboardUrl: "/dashboard/admin",
    links: [
      { label: "User List", to: "/dashboard/admin/users" },
      { label: "Donor List", to: "/dashboard/admin/donors" },
      { label: "Recipient List", to: "/dashboard/admin/recipients" },
    ],
  },
  donor: {
    dashboardLabel: "Donor Dashboard",
    dashboardUrl: "/dashboard/donor",
    links: [
      { label: "My Donations History", to: "/dashboard/donor/history" },
      { label: "Events", to: "/dashboard/donor/events" },
      { label: "Notifications", to: "/dashboard/donor/notifications" },
      { label: "Achievements", to: "/dashboard/donor/achievements" },
    ],
  },
  recipient: {
    dashboardLabel: "Recipient Dashboard",
    dashboardUrl: "/dashboard/recipient",
    links: [{ label: "My Requests", to: "/dashboard/recipient" }],
  },
};

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return null; // or a loader while auth initializes

  const { dashboardLabel, dashboardUrl, links } = roleConfig[user.role] || {};

  return (
    <div className="flex h-[90vh]">
      {/* Mobile Hamburger */}
      <motion.div
        className="md:hidden fixed top-5 z-60"
        animate={{ x: ["0%", "20%", "0%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative
        `}
      >
        <div>
          <h1 className="text-2xl font-bold p-4 mt-10">{dashboardLabel}</h1>
          <nav className="flex flex-col gap-2 p-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `p-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom section */}
        <div className="p-4 border-t border-gray-700">
          <Link to={`${dashboardUrl}/profile`}>
            <button className="w-full text-left p-2 rounded hover:bg-gray-700">
              Profile
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left p-2 rounded bg-red-600 mt-2 cursor-pointer hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
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

export default DashboardLayout;
