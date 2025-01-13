/* eslint-disable no-unused-vars */
import React from 'react';

const Navbar = () => {
  return (
    <>
    <nav className="bg-blue-500 text-white">
    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left section: Brand/Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold">
                <a href='/'
                className='text-xl font-bold'> 
                
                Bhanu Secondary School</a></h1>
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

      
          <div className="hidden lg:flex space-x-6">
            <a
              href="#"
              className="text-white hover:text-yellow-300 transition duration-300"
            >
              Home
            </a>
            <a
              href="#"
              className="text-white hover:text-yellow-300 transition duration-300"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-white hover:text-yellow-300 transition duration-300"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

     
      <div className="lg:hidden">
        <div className="px-4 pt-2 pb-4 space-y-2">
          <a
            href="#"
            className="block text-white hover:text-yellow-300 transition duration-300"
          >
            Home
          </a>
          <a
            href="#"
            className="block text-white hover:text-yellow-300 transition duration-300"
          >
            About Us
          </a>
          <a
            href="#"
            className="block text-white hover:text-yellow-300 transition duration-300"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;