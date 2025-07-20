/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#3F51B5] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-white">
                Bhanu Secondary School
              </h1>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-[#FF9800] focus:outline-none transition-colors duration-300"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <svg
                  className="h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Links for large screens */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg text-white hover:bg-[#303F9F] hover:text-white transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 rounded-lg text-white hover:bg-[#303F9F] hover:text-white transition-colors duration-300"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 rounded-lg text-white hover:bg-[#303F9F] hover:text-white transition-colors duration-300"
            >
              Contact
            </Link>

            {!token ? (
              <div className="flex items-center space-x-1 ml-4">
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-[#FF9800] text-[#212121] hover:bg-[#F57C00] font-medium transition-colors duration-300"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg border border-white text-white hover:bg-white hover:text-[#3F51B5] font-medium transition-colors duration-300"
                >
                  Login
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-1 ml-4">
                {role === "teacher" && (
                  <Link
                    to="/teacher-dashboard"
                    className="px-4 py-2 rounded-lg bg-[#00BCD4] text-[#212121] hover:bg-[#0097A7] font-medium transition-colors duration-300"
                  >
                    Teacher Dashboard
                  </Link>
                )}
                {role === "student" && (
                  <Link
                    to="/student-dashboard"
                    className="px-4 py-2 rounded-lg bg-[#00BCD4] text-[#212121] hover:bg-[#0097A7] font-medium transition-colors duration-300"
                  >
                    Student Dashboard
                  </Link>
                )}
                {role === "guest" && (
                  <Link
                    to="/guest-dashboard"
                    className="px-4 py-2 rounded-lg bg-[#00BCD4] text-[#212121] hover:bg-[#0097A7] font-medium transition-colors duration-300"
                  >
                    Guest Dashboard
                  </Link>
                )}
                {role === "admin" && (
                  <Link
                    to="/admin-dashboard"
                    className="px-4 py-2 rounded-lg bg-[#00BCD4] text-[#212121] hover:bg-[#0097A7] font-medium transition-colors duration-300"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg border border-white text-white hover:bg-white hover:text-[#3F51B5] font-medium transition-colors duration-300 ml-2"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4">
            <div className="flex flex-col space-y-2 pt-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-white hover:bg-[#303F9F] transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-white hover:bg-[#303F9F] transition-colors duration-300"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-white hover:bg-[#303F9F] transition-colors duration-300"
              >
                Contact
              </Link>

              {!token ? (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 rounded-lg bg-[#FF9800] text-[#212121] hover:bg-[#F57C00] font-medium text-center transition-colors duration-300"
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 rounded-lg border border-white text-white hover:bg-white hover:text-[#3F51B5] font-medium text-center transition-colors duration-300"
                  >
                    Login
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  {role === "teacher" && (
                    <Link
                      to="/teacher-dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-3 rounded-lg bg-[#00BCD4] text-[#212121] hover:bg-[#0097A7] font-medium text-center transition-colors duration-300"
                    >
                      Teacher Dashboard
                    </Link>
                  )}
                  {role === "student" && (
                    <Link
                      to="/student-dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-3 rounded-lg bg-[#00BCD4] text-[#212121] hover:bg-[#0097A7] font-medium text-center transition-colors duration-300"
                    >
                      Student Dashboard
                    </Link>
                  )}
                  {role === "guest" && (
                    <Link
                      to="/guest-dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-3 rounded-lg bg-[#00BCD4] text-[#212121] hover:bg-[#0097A7] font-medium text-center transition-colors duration-300"
                    >
                      Guest Dashboard
                    </Link>
                  )}
                  {role === "admin" && (
                    <Link
                      to="/admin-dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-3 rounded-lg bg-[#00BCD4] text-[#212121] hover:bg-[#0097A7] font-medium text-center transition-colors duration-300"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="px-4 py-3 rounded-lg border border-white text-white hover:bg-white hover:text-[#3F51B5] font-medium transition-colors duration-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
