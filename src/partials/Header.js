import React from 'react';
import SearchModal from './header/SearchModal';
import Notifications from './header/Notifications';
import Help from './header/Help';
import UserMenu from './header/UserMenu';
import logo from './logo.png'; // with import
import { Image } from "@chakra-ui/react"
import { NavLink } from 'react-router-dom';

export const Header=(props)=>{

  const { sidebarOpen,setSidebarOpen} = props;
  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">

          {/* Header: Left side */}
          <div className="flex">

            {/* Hamburger button */}
            <button
              className="text-gray-500 hover:text-gray-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => {
                console.log(sidebarOpen)
                console.log(typeof sidebarOpen)
                console.log(!sidebarOpen)
                const new_sidebarOpen =!sidebarOpen
               
                setSidebarOpen(new_sidebarOpen )
                console.log("Sidebar")
                console.log(sidebarOpen)
               
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>

          </div>

          {/* Header: Right side */}
          <div className="flex items-center">
              <NavLink exact to={`/otherportfolio`} className={"flex items-center"}>
                
                <Image
                htmlWidth={200}
                  src={logo}
                />
              </NavLink>
            {/*  Divider */}
            <hr className="w-px h-6 bg-gray-200 mx-3" />
            <UserMenu />

          </div>

        </div>
      </div>
    </header>
  );
}
