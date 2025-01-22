/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import Sidebar from './component/Sidebar';
import { useNavigate } from 'react-router-dom';

const Button = ({ color, onClick, children }) => (
  <button
    className={`py-3 px-8 rounded-lg text-white font-semibold transition-all duration-300 focus:outline-none shadow-md transform hover:scale-105 ${color} hover:${color === 'bg-blue-500' ? 'bg-blue-600' : color === 'bg-green-500' ? 'bg-green-600' : 'bg-gray-600'}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const ProfileManager = () => {
    const navigate = useNavigate()
  return (
    <div className="flex">
      <Sidebar title="Dashboard" />
      <div className="w-full justify-center ">
        <h1 className="text-4xl font-bold text-blue-700 mb-8"> </h1>


        {/* <div className="bg-white p-8 rounded-2xl shadow-xl mb-8"> */}
       
          {/* <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Your Profile</h2> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center pt-5">
      
            <div className="flex justify-center">
        
              <Button
                color="bg-blue-500"
                onClick={() => 
                    navigate("/ticket")
                 }
              >
                View Your Ticket
              </Button>
            </div>

            <div className="flex justify-center">
              <Button
                color="bg-green-500"
                onClick={() => alert('View Your History clicked')}
              >
                View Your History
              </Button>
            </div>

            <div className="flex justify-center">
              <Button
                color="bg-gray-500"
                onClick={() => alert('More Options clicked')}
              >
                More
              </Button>
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default ProfileManager;
