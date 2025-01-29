/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import Sidebar from './component/Sidebar'; // Default sidebar for non-admin users
import AdminSidebar from '../admin/sidebar/Sidebar'; // Sidebar for admin users
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Button = ({ color, onClick, children }) => (
  <button
    className={`py-3 px-8 rounded-lg text-white font-semibold transition-all duration-300 focus:outline-none shadow-md transform hover:scale-105 ${color} hover:${color === 'bg-blue-500' ? 'bg-blue-600' : color === 'bg-green-500' ? 'bg-green-600' : 'bg-gray-600'}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const ProfileManager = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get userId from URL params
  const token = localStorage.getItem('token'); // Retrieve the auth token from localStorage
  const role = localStorage.getItem('role'); // Retrieve the role from localStorage

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action will delete your account permanently");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`https://schedulemyschool.onrender.com/api/user/${id}`, {
          headers: {
            Authorization: `${token}`, // Pass the token in headers
          },
        });

        if (response.status === 200) {
          alert('Your account has been successfully deleted.');
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          navigate('/'); // Redirect to home or login page after account deletion
        } else {
          alert('Failed to delete the account. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="flex">
      {/* Conditionally render the Sidebar based on the role */}
      {role === 'admin' ? (
        <AdminSidebar title="Admin Dashboard" />  // Admin sidebar
      ) : (
        <Sidebar title="Dashboard" />  // Default sidebar for non-admin users
      )}

      <div className="w-full justify-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-8"> </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center pt-5">
          <div className="flex justify-center">
            <Button color="bg-blue-500" onClick={() => navigate("/ticket")}>
              View Your Ticket
            </Button>
          </div>

          <div className="flex justify-center">
            <Button color="bg-green-500" onClick={() => alert('View Your History clicked')}>
              View Your History
            </Button>
          </div>

          <div className="flex justify-center">
            <Button color="bg-gray-500" onClick={handleDeleteAccount}>
              Delete Your Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManager;
