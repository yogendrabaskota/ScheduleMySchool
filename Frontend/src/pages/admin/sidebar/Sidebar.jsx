/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  FiUsers,
  FiFileText,
  FiActivity,
  FiSettings,
  FiLogOut,
  FiHome,
} from "react-icons/fi";

const AdminSidebar = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [id, setUserId] = useState(null);
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }

    // Set active item based on current route
    const path = location.pathname;
    if (path.includes("all-users")) setActiveItem("users");
    else if (path.includes("reports")) setActiveItem("reports");
    else if (path.includes("audit-logs")) setActiveItem("logs");
    else if (path.includes("system-settings")) setActiveItem("settings");
  }, [location]);

  const menuItems = [
    {
      name: "dashboard",
      label: "Dashboard",
      path: "/admin-dashboard",
      icon: <FiHome size={20} />,
      visible: true,
    },
    {
      name: "users",
      label: "User Management",
      path: "/all-users",
      icon: <FiUsers size={20} />,
      visible: true,
    },
    {
      name: "reports",
      label: "Reports",
      path: "/admin/reports",
      icon: <FiFileText size={20} />,
      visible: true,
    },
    {
      name: "logs",
      label: "Audit Logs",
      path: "/admin/audit-logs",
      icon: <FiActivity size={20} />,
      visible: true,
    },
    {
      name: "settings",
      label: "System Settings",
      path: "/admin/system-settings",
      icon: <FiSettings size={20} />,
      visible: false, // Hidden for now as per your original code
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-[#3F51B5] text-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-[#5C6BC0]">
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-sm text-[#C5CAE9] mt-1">Administration Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems
            .filter((item) => item.visible)
            .map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 py-3 px-4 rounded-lg transition-all duration-200 ${
                    activeItem === item.name
                      ? "bg-white text-[#3F51B5] shadow-md"
                      : "hover:bg-[#303F9F] hover:bg-opacity-50"
                  }`}
                >
                  <span
                    className={`${
                      activeItem === item.name ? "text-[#3F51B5]" : "text-white"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#5C6BC0]">
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-[#FF9800] flex items-center justify-center">
            <span className="font-bold text-white">
              {id ? id.charAt(0).toUpperCase() : "A"}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium">Admin Account</p>
            <p className="text-xs text-[#C5CAE9]">
              {id ? `ID: ${id.substring(0, 6)}...` : "Logged In"}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-[#303F9F] hover:bg-opacity-50 text-white"
        >
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
