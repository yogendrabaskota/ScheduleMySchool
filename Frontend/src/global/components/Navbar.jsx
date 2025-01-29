/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // Fetch the role from localStorage
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  const handleLogout = () => {
    // Remove token and role from localStorage and redirect to home or login page
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/'); // Redirect to login page or homepage
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold">
              <Link to="/" className="text-xl font-bold">
                Bhanu Secondary School
              </Link>
            </h1>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
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

          {/* Links for large screens */}
          <div className="hidden lg:flex space-x-6 items-center">
            <Link
              to="/"
              className="text-white hover:text-yellow-300 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-yellow-300 transition duration-300"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-yellow-300 transition duration-300"
            >
              Contact
            </Link>

            {!token ? (
              <>
                <Link
                  to="/register"
                  className="text-white hover:text-yellow-300 transition duration-300"
                >
                  Register
                </Link>
                <Link
                  to="/login"
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
                {role === 'teacher' && (
                  <Link
                    to="/teacher-dashboard"
                    className="text-white hover:text-yellow-300 transition duration-300"
                  >
                    Teacher Dashboard
                  </Link>
                )}
                {role === 'student' && (
                  <Link
                    to="/student-dashboard"
                    className="text-white hover:text-yellow-300 transition duration-300"
                  >
                    Student Dashboard
                  </Link>
                )}
                {role === 'guest' && (
                  <Link
                    to="/guest-dashboard"
                    className="text-white hover:text-yellow-300 transition duration-300"
                  >
                    Guest Dashboard
                  </Link>
                )}
                {role === 'admin' && (
                  <Link
                    to="/admin-dashboard"
                    className="text-white hover:text-yellow-300 transition duration-300"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile menu (visible when isMenuOpen is true) */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-2 mt-2">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="block text-white hover:text-yellow-300 transition duration-300"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="block text-white hover:text-yellow-300 transition duration-300"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block text-white hover:text-yellow-300 transition duration-300"
              >
                Contact
              </Link>
              {!token ? (
                <>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-white hover:text-yellow-300 transition duration-300"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-white hover:text-yellow-300 transition duration-300"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block text-white hover:text-yellow-300 transition duration-300"
                  >
                    Logout
                  </button>
                  {role === 'teacher' && (
                    <Link
                      to="/teacher-dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-white hover:text-yellow-300 transition duration-300"
                    >
                      Teacher Dashboard
                    </Link>
                  )}
                  {role === 'student' && (
                    <Link
                      to="/student-dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-white hover:text-yellow-300 transition duration-300"
                    >
                      Student Dashboard
                    </Link>
                  )}
                  {role === 'guest' && (
                    <Link
                      to="/guest-dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-white hover:text-yellow-300 transition duration-300"
                    >
                      Guest Dashboard
                    </Link>
                  )}
                  {role === 'admin' && (
                    <Link
                      to="/admin-dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-white hover:text-yellow-300 transition duration-300"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;