import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate
import { 
  LayoutGrid, 
  Briefcase, 
  FileEdit, 
  LayoutList, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  HelpCircle,
  LogOut,
  User
} from 'lucide-react';
import { useSidebar } from '../contexts/SidebarContext';
import { useTheme } from '../contexts/ThemeContext';
import Tooltip from './Tooltip'; 
import { useNavigationBlocker } from '../contexts/NavigationBlockerContext'; // Import

const Sidebar = () => {
  const { isCollapsed, isMobileView } = useSidebar();
  const { isDarkMode, themeColors } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const { requestNavigationConfirmation } = useNavigationBlocker(); // Use the context
  const userName = localStorage.getItem('userName') || "John Camerson";

  const menuItems = [
    { path: '/', name: 'Dashboard', icon: <LayoutGrid className="w-5 h-5" /> },
    { path: '/channels', name: 'My Business', icon: <Briefcase className="w-5 h-5" /> },
    { path: '/post-creation', name: 'Create', icon: <FileEdit className="w-5 h-5" /> },
    { path: '/engage', name: 'Publish', icon: <LayoutList className="w-5 h-5" /> },
    { path: '/posts', name: 'Engage', icon: <MessageSquare className="w-5 h-5" /> },
    { path: '/analytics', name: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
  ];

  const bottomMenuItems = [
    { path: '/settings', name: 'Settings', icon: <Settings className="w-5 h-5" /> },
    { path: '/support', name: 'Support', icon: <HelpCircle className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const handleViewProfile = () => {
    navigate('/profile');
    setShowProfileMenu(false);
  };

  const handleNavigation = (e, path) => {
    if (requestNavigationConfirmation(path)) {
      e.preventDefault(); // Prevent NavLink's default navigation if blocked
    }
    // If not blocked, NavLink will navigate automatically
  };

  const navOverflowClass = (isCollapsed && !isMobileView) ? 'overflow-visible' : 'overflow-y-auto';

  return (
    <aside className={`${(isCollapsed && !isMobileView) ? 'w-20' : 'w-64'} h-full border-r border-theme-light-accent/20 dark:border-theme-dark-accent/20 flex flex-col transition-all duration-300 ease-in-out bg-white dark:bg-primary-dark`}>
      <div className="p-4 border-b border-theme-light-accent/20 dark:border-theme-dark-accent/20 flex items-center justify-center h-20">
        {(isCollapsed && !isMobileView) ? (
          <Tooltip text="Demo Name" position="right">
            <div className="w-8 h-8 bg-theme-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
              DN
            </div>
          </Tooltip>
        ) : (
          <h1 className="text-xl font-semibold text-theme-primary">Demo Name</h1>
        )}
      </div>
      
      <nav className={`flex-1 py-4 custom-scrollbar ${navOverflowClass}`}>
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.path} className="relative">
              <NavLink
                to={item.path}
                onClick={(e) => handleNavigation(e, item.path)} // Add onClick handler
                className={({ isActive }) => 
                  `flex items-center ${(isCollapsed && !isMobileView) ? 'justify-center h-12' : 'gap-3 h-11'} py-2.5 ${(isCollapsed && !isMobileView) ? 'px-2' : 'px-4'} 
                  ${isActive 
                    ? 'bg-theme-primary/10 text-theme-primary dark:bg-theme-primary/20 dark:text-theme-primary font-medium' 
                    : `${isDarkMode ? 'text-gray-300' : 'text-gray-600'} hover:bg-gray-100 dark:hover:bg-gray-700`
                  } rounded-lg transition-colors duration-200 group`
                }
                end={item.path === '/'}
              >
                {(isCollapsed && !isMobileView) ? (
                  <Tooltip text={item.name} position="right">
                    <div>{React.cloneElement(item.icon, { className: `w-5 h-5 ${isDarkMode ? 'group-hover:text-white' : 'group-hover:text-gray-700'}` })}</div>
                  </Tooltip>
                ) : (
                  <>
                    {React.cloneElement(item.icon, { className: `w-5 h-5 ${isDarkMode ? 'group-hover:text-white' : 'group-hover:text-gray-700'}` })}
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="border-t border-theme-light-accent/20 dark:border-theme-dark-accent/20 py-4">
        <ul className="space-y-1 px-3">
          {bottomMenuItems.map((item) => (
             <li key={item.path} className="relative">
              <NavLink
                to={item.path}
                onClick={(e) => handleNavigation(e, item.path)} // Add onClick handler
                className={({ isActive }) => 
                  `flex items-center ${(isCollapsed && !isMobileView) ? 'justify-center h-12' : 'gap-3 h-11'} py-2.5 ${(isCollapsed && !isMobileView) ? 'px-2' : 'px-4'} 
                  ${isActive 
                    ? 'bg-theme-primary/10 text-theme-primary dark:bg-theme-primary/20 dark:text-theme-primary font-medium' 
                    : `${isDarkMode ? 'text-gray-300' : 'text-gray-600'} hover:bg-gray-100 dark:hover:bg-gray-700`
                  } rounded-lg transition-colors duration-200 group`
                }
              >
                {(isCollapsed && !isMobileView) ? (
                  <Tooltip text={item.name} position="right">
                    <div>{React.cloneElement(item.icon, { className: `w-5 h-5 ${isDarkMode ? 'group-hover:text-white' : 'group-hover:text-gray-700'}` })}</div>
                  </Tooltip>
                ) : (
                  <>
                    {React.cloneElement(item.icon, { className: `w-5 h-5 ${isDarkMode ? 'group-hover:text-white' : 'group-hover:text-gray-700'}` })}
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="border-t border-theme-light-accent/20 dark:border-theme-dark-accent/20 p-4 relative h-[76px] flex items-center justify-center">
        <Tooltip text={userName} position={(isCollapsed && !isMobileView) ? "right" : "top"}>
          <div 
            className={`flex ${(isCollapsed && !isMobileView) ? 'justify-center' : 'items-center w-full'} cursor-pointer`}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <img 
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=${themeColors.primary.substring(1)}&color=fff&size=${(isCollapsed && !isMobileView) ? 36 : 40}&font-size=0.4&bold=true`}
              alt={userName} 
              className={`${(isCollapsed && !isMobileView) ? 'w-9 h-9' : 'w-10 h-10 mr-3'} rounded-full shadow-sm`}
            />
            {(!isCollapsed || isMobileView) && <span className="font-medium text-sm truncate flex-1">{userName}</span>}
          </div>
        </Tooltip>
        
        {showProfileMenu && (
          <div className={`absolute bottom-full mb-2 ${(isCollapsed && !isMobileView) ? 'left-full ml-2 w-48' : 'left-0 right-0 mx-4 w-auto'} p-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-[101] border border-gray-200 dark:border-gray-700`}>
            <button 
              onClick={(e) => {
                if (requestNavigationConfirmation('/profile')) {
                  e.preventDefault();
                  setShowProfileMenu(false); // Close menu if navigation is blocked
                } else {
                  handleViewProfile();
                }
              }}
              className="flex items-center gap-2 w-full p-2.5 text-sm text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>View Profile</span>
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 w-full p-2.5 text-sm text-left rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
