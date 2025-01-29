/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "./sidebar/Sidebar";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">

      <Sidebar title="Admin Dashboard" />

 
      <div className="flex-grow p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome to the Dashboard</h2>
        <p className="text-gray-600">
          Select an action from the left sidebar to get started.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
