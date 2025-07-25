/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Sidebar = ({ title }) => {
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
    if (path.includes("profile")) setActiveItem("profile");
    else if (path.includes("ticket")) setActiveItem("ticket");
    else if (path.includes("history")) setActiveItem("history");
  }, [location]);

  const handleNavigation = (path, itemName) => {
    navigate(path);
    setActiveItem(itemName);
  };

  const menuItems = [
    {
      name: "profile",
      label: "Profile Manager",
      path: id ? `/profile/${id}` : "#",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      ),
      disabled: !id,
    },
    {
      name: "ticket",
      label: "Your Tickets",
      path: "/ticket",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
        </svg>
      ),
    },
    {
      name: "history",
      label: "Your History",
      path: "/history",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-64 h-screen bg-[#3F51B5] text-white p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold mb-2">{title}</h1>
        <div className="h-1 w-16 bg-[#FF9800] rounded-full"></div>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() =>
                  !item.disabled && handleNavigation(item.path, item.name)
                }
                className={`w-full flex items-center space-x-3 py-3 px-4 rounded-lg transition-all duration-200 ${
                  activeItem === item.name
                    ? "bg-white text-[#3F51B5] shadow-md"
                    : "hover:bg-[#303F9F] hover:bg-opacity-50"
                } ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={item.disabled}
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

      <div className="mt-auto pt-4 border-t border-[#5C6BC0]">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-[#FF9800] flex items-center justify-center">
            <span className="font-bold">
              {id ? id.charAt(0).toUpperCase() : "U"}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium">User Account</p>
            <p className="text-xs text-[#C5CAE9]">
              {id ? `ID: ${id.substring(0, 6)}...` : "Not logged in"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
