"use client";

import React, { useRef, useEffect, useState } from 'react';
import Sidebar from './Compo/Sidebar';
import { usePathname } from 'next/navigation';
import Header from './Component/AdminHeader';

const Layout = ({ children }) => {


  
  
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    console.log('Toggle Sidebar clicked');
    setIsOpen(!isOpen);
  };

  // Close sidebar on route change
  useEffect(() => {
    setIsOpen(false); // Close sidebar when the route changes
  }, [pathname]);

  // Handle click outside of the sidebar to close it
  useEffect(() => {
const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  
  

  return (<div className="h-screen flex flex-col">
      {/* HEADER FIXE */}
      <Header toggleSidebar={toggleSidebar}/> 

      {/* ZONE CENTRALE */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar desktop */}
        <aside className="hidden md:block w-64 bg-white border-r mt-20">
          <Sidebar />
        </aside>

        {/* Sidebar mobile */}
        <aside
          ref={sidebarRef}
          className={`fixed md:hidden top-0 left-0 w-64 h-full bg-white shadow-lg z-40 transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </aside>

        {/* MAIN SCROLLABLE */}
        <main className="flex-1 overflow-y-auto bg-[#eff3f4] p-6 py-14">
          {children}
        </main>
      </div>
    </div>
      );
};

export default Layout;


