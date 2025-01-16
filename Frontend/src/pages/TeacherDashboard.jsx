/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    navigate('/create-event'); // Redirect to Create Event page
  };

  const handleUpdateEvent = () => {
    navigate('/update-event'); // Redirect to Update Event page
  };

  const handleDeleteUser = () => {
    navigate('/delete-user'); // Redirect to Delete User page
  };

  const handleManageAttendance = () => {
    navigate('/manage-attendance'); // Redirect to Manage Attendance page
  };

  const handleLogout = () => {
    // Clear token and role from localStorage and redirect to login
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">
          Teacher Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleCreateEvent}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
          >
            Create Event
          </button>
          <button
            onClick={handleUpdateEvent}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Update Event
          </button>
          <button
            onClick={handleDeleteUser}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
          >
            Delete User
          </button>
          <button
            onClick={handleManageAttendance}
            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
          >
            Manage Attendance
          </button>
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={handleLogout}
            className="bg-gray-700 text-white py-2 px-6 rounded hover:bg-gray-800 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
