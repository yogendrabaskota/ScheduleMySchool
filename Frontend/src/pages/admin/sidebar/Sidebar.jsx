/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AdminSidebar = ({ title }) => {
  const navigate = useNavigate();
  const [id, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id); // Set the user ID from the decoded token
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-64 p-6">
      <h1 className="text-xl font-bold text-blue-600 mb-8">{title}</h1>
      <ul className="space-y-6">
        {/* Profile Manager */}
        <li>
          <button
            onClick={() => id && handleNavigation(`/profile/${id}`)}
            className="w-full text-left bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
            disabled={!id}
          >
            Profile Manager
          </button>
        </li>

        {/* User Manager */}
        <li>
          <button
            onClick={() => handleNavigation("/all-users")}
            className="w-full text-left bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
          >
            User Manager
          </button>
        </li>

        {/* System Settings */}
        {/* <li>
          <button
            onClick={() => handleNavigation("/admin/system-settings")}
            className="w-full text-left bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition duration-300"
          >
            System Settings
          </button>
        </li> */}

        {/* Reports */}
        <li>
          <button
            onClick={() => handleNavigation("/admin/reports")}
            className="w-full text-left bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
          >
            Reports
          </button>
        </li>

        {/* Audit Logs */}
        <li>
          <button
            onClick={() => handleNavigation("/admin/audit-logs")}
            className="w-full text-left bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Audit Logs
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;