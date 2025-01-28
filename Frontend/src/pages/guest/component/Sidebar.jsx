/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const Sidebar = ({ title }) => {
  const navigate = useNavigate();
  const [id, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token); 

        //console.log(decodedToken)
        //console.log(decodedToken.id)
        setUserId(decodedToken.id); 
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
        <li>
          <button
            onClick={() => id && handleNavigation(`/profile/${id}`)}
            className="w-full text-left bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
            disabled={!id}
          >
            Profile Manager
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigation("/ticket")}
            className="w-full text-left bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
          >
            Your Tickets
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigation("/your-assignments")}
            className="w-full text-left bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Your History
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
