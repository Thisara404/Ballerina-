"use client";

import { Footer } from "flowbite-react";
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';

const Foot = () => {
  return (
    <Footer container className="p-4 sm:p-6 bg-white shadow-md w-full">
      <div className="w-full text-center">
        {/* Flexbox for layout on larger screens */}
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center justify-center sm:justify-start mb-4 sm:mb-0">
            {/* Adjust padding for different screens */}
            <img src={logo} className="mr-3 h-11 sm:h-11" alt="Fishermate Logo - A platform for fishermen" />
            <span className="self-center whitespace-nowrap text-2xl font-semibold text-black">
              FisherMate
            </span>
          </Link>
          {/* Footer links in a responsive layout */}
          <Footer.LinkGroup className="flex flex-wrap justify-center sm:justify-end space-x-4">
            <Link to="#" className="hover:text-blue-500">About</Link>
            <Link to="#" className="hover:text-blue-500">Privacy Policy</Link>
            <Link to="#" className="hover:text-blue-500">Licensing</Link>
            <Link to="#" className="hover:text-blue-500">Contact</Link>
          </Footer.LinkGroup>
        </div>
        {/* Divider between sections */}
        <Footer.Divider className="my-2" />
        {/* Copyright section */}
        <Footer.Copyright href="#" by="FisherMate™" year={2024} />
      </div>
    </Footer>
  );
};

export default Foot;
