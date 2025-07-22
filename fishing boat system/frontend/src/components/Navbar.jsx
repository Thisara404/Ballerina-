import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';  
import logo from '../assets/images/logo.png';
import { useAuth } from "../AuthContext";

const Navibar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout, userInfo } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userDetails");
    logout();
    navigate('/login');
  };

  const getInitials = (firstName = "", lastName = "") => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Navbar fluid className="bg-blue-600 fixed top-0 left-0 right-0 z-50">
      <Navbar.Brand>
        <Link to="/" className="flex items-center pl-12 md:pl-0">
          <img src={logo} className="mr-3 h-11 sm:h-11" alt="FisherMate Logo" />
          <span className="self-center whitespace-nowrap text-2xl font-semibold text-white">
            FisherMate
          </span>
        </Link>
      </Navbar.Brand>

      {/* Mobile menu button */}
      {!isAuthenticated && (
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden inline-flex items-center p-2 ml-3 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      )}

      <div className={`w-full md:block md:w-auto ${isAuthenticated ? 'block' : (isMenuOpen ? 'block' : 'hidden')}`}>
        {isAuthenticated && userInfo ? (
          <div className="flex md:order-2">
            <span className="block text-lg pt-2 pr-2 font-semibold text-white italic">{userInfo.firstName}</span>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar 
                  alt="User profile"
                  rounded
                  img={userInfo.profilePhoto}
                  placeholderInitials={getInitials(userInfo.firstName, userInfo.lastName)}
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{`${userInfo.firstName} ${userInfo.lastName}`}</span>
                <span className="block truncate text-sm font-medium">{userInfo.email}</span>
              </Dropdown.Header>
              <Dropdown.Item>
                <Link to="/dashboard">Dashboard</Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
            </Dropdown>
          </div>
        ) : (
          <div className={`flex flex-col md:flex-row items-center ml-auto ${isMenuOpen ? 'absolute top-16 right-0 bg-blue-600 w-full p-4' : ''}`}>
            <Link 
              to="/login" 
              className="text-white hover:bg-blue-500 px-4 py-2 mx-2 rounded text-center w-full md:w-auto mb-2 md:mb-0"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-4 py-2 rounded text-center w-full md:w-auto"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </Navbar>
  );
};

export default Navibar;