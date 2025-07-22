import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiShoppingBag,
  HiBell,
  HiUser,
  HiViewBoards,
  HiMenu
} from "react-icons/hi";
import { useAuth } from "../AuthContext"; // Import your auth context

const Leftbar = ({ fishingStatus }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { userInfo } = useAuth(); // Get user info from auth context
  const [localFishingStatus, setLocalFishingStatus] = useState(
    localStorage.getItem("fishingStatus") || "Unknown"
  );

  const [visitedPaths, setVisitedPaths] = useState(() => {
    // Retrieve visited paths from localStorage or initialize as an empty array
    const storedPaths = localStorage.getItem("visitedPaths");
    return storedPaths ? JSON.parse(storedPaths) : [];
  });

  useEffect(() => {
    const status = localStorage.getItem("fishingStatus") || "Unknown";
    setLocalFishingStatus(status);
  }, [fishingStatus]);

  useEffect(() => {
    // Mark the current path as visited and update localStorage
    if (!visitedPaths.includes(location.pathname)) {
      const updatedVisitedPaths = [...visitedPaths, location.pathname];
      setVisitedPaths(updatedVisitedPaths);
      localStorage.setItem("visitedPaths", JSON.stringify(updatedVisitedPaths));
    }
  }, [location.pathname, visitedPaths]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  const getSidebarItemClass = (path) => {
    if (location.pathname === path) {
      return 'bg-blue-500'; // Active route color
    } else if (visitedPaths.includes(path)) {
      return 'bg-white'; // Visited route color
    } else {
      return 'bg-gray-50'; // Default style for unvisited paths
    }
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white text-gray-800 rounded"
        onClick={toggleSidebar}
        aria-expanded={isSidebarOpen}
        aria-controls="sidebar"
      >
        <HiMenu className="h-6 w-6" />
      </button>

      <div
        className={`fixed top-16 left-0 h-full w-64 bg-gray-50 text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
        role="navigation"
        id="sidebar"
      >
        {/* Profile Section */}
        {userInfo && (
          <div className="p-2 flex flex-col items-center border-b  border-gray-700">
            <img
              src={userInfo.profilePhoto} // User's profile photo
              alt="Profile"
              className="h-20 w-20 rounded-full "
            />
            <div>
              <p className="text-lg font-semibold text-black text-center">{userInfo.firstName} {userInfo.lastName}</p>
              <p className="text-sm text-black text-center">{userInfo.email}</p>
            </div>
          </div>
        )}

        <Sidebar aria-label="Responsive Sidebar">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Link to="/dashboard" onClick={handleLinkClick}>
                <Sidebar.Item
                  icon={HiChartPie}
                  className={`hover:bg-blue-500 ${getSidebarItemClass("/dashboard")}`}
                >
                  Dashboard
                </Sidebar.Item>
              </Link>
              <Link to="/resources" onClick={handleLinkClick}>
                <Sidebar.Item
                  icon={HiViewBoards}
                  label="Pro"
                  labelColor="dark"
                  className={`hover:bg-blue-500 ${getSidebarItemClass("/resources")}`}
                >
                  Resources
                </Sidebar.Item>
              </Link>
              <Link to="/alerts" onClick={handleLinkClick}>
                <Sidebar.Item
                  icon={HiBell}
                  label={localFishingStatus}
                  labelColor={localFishingStatus === "Safe" ? "green" : "red"}
                  className={`hover:bg-blue-500 ${getSidebarItemClass("/alerts")}`}
                >
                  Safety Alert
                </Sidebar.Item>
              </Link>
              <Link to="/market" onClick={handleLinkClick}>
                <Sidebar.Item
                  icon={HiShoppingBag}
                  className={`hover:bg-blue-500 ${getSidebarItemClass("/market")}`}
                >
                  Market Access
                </Sidebar.Item>
              </Link>
              <Link to="/profile" onClick={handleLinkClick}>
                <Sidebar.Item
                  icon={HiUser}
                  className={`hover:bg-blue-500 ${getSidebarItemClass("/profile")}`}
                >
                  My Profile
                </Sidebar.Item>
              </Link>
              <Link to="/settings" onClick={handleLinkClick}>
                <Sidebar.Item
                  icon={HiArrowSmRight}
                  className={`hover:bg-blue-500 ${getSidebarItemClass("/settings")}`}
                >
                  Settings
                </Sidebar.Item>
              </Link>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Leftbar;
