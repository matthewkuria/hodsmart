"use client"
import React, { useState } from 'react'
import HeaderSideBarToggle from './HeaderSideBarToggle'
import UserProfileComponent from './UserProfileComponent'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  toggleSidebar: () => void;
  isShowSidebar: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isShowSidebar }) => {
  
   
  return (
      <header className="header flex items-center justify-between  h-16 px-4 shadow-md w-full fixed top-0 bg-white z-10 mb-4">
          <div className="">
         <Button
          className="bg-slate-400 text-black hover:bg-blue-500 hover:text-white"
          variant="outline"
          size="icon"
           onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          data-state={isShowSidebar ? 'open' : 'closed'}
        >
            <div className="flex items-center justify-center w-10 h-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </div>
          </Button>
          </div>
            <div className="flex items-center justify-end w-full">
              <UserProfileComponent />    
            </div>
          
      </header>
  )
}

export default Header