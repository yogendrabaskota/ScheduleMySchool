/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  // Check if the token and role exist in localStorage
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // Fetch the role from localStorage
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token and role from localStorage and redirect to home or login page
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/'); // Redirect to login page or homepage
  };

  return (
    <>
      <nav className="bg-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">
                <a href="/" className="text-xl font-bold">
                  Bhanu Secondary School
                </a>
              </h1>
            </div>

            <div className="lg:hidden">
              <button
                className="text-white focus:outline-none"
                aria-label="Toggle Menu"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>

            <div className="hidden lg:flex space-x-6 items-center">
              <Link
                to={`/`}
                className="text-white hover:text-yellow-300 transition duration-300"
              >
                Home
              </Link>
              <Link
                to={`/about`}
                className="text-white hover:text-yellow-300 transition duration-300"
              >
                About Us
              </Link>
              <Link
                to={`/contact`}
                className="text-white hover:text-yellow-300 transition duration-300"
              >
                Contact
              </Link>

              {/* Conditionally render Login/Register or Logout buttons */}
              {!token ? (
                <>
                  <Link
                    to={`/register`}
                    className="text-white hover:text-yellow-300 transition duration-300"
                  >
                    Register
                  </Link>
                  <Link
                    to={`/login`}
                    className="text-white hover:text-yellow-300 transition duration-300"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-yellow-300 transition duration-300"
                  >
                    Logout
                  </button>
                  {/* Show "Teacher Dashboard" for teachers, otherwise display role */}
                  {role == 'teacher' ? (
                    <Link
                      to={`/teacher-dashboard`}
                      className="text-white hover:text-yellow-300 transition duration-300"
                    >
                      Teacher Dashboard
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-300">
                      <strong>{role}</strong>
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
