"use client";
import { Suspense, useState } from "react";
import SideNav from "../ui/dashboard/sidenav";
import Loading from "./loading";
import Header from "../ui/dashboard/Header";
 
export default function Layout({ children }: { children: React.ReactNode }) {
 const [isShowSidebar, setIsShowSidebar] = useState(true)
     const toggleSidebar = () => {
         setIsShowSidebar(!isShowSidebar)
         console.log("Sidebar toggled")
  }
  return (
    <div className="flex h-full w-full">
      <Header toggleSidebar={toggleSidebar} isShowSidebar={isShowSidebar}/>
      <div className="flex-1 ml-16 mt-16 overflow-y-auto">
        <Suspense fallback={<Loading />}>
          <div className="flex items-center justify-center h-full w-full">
            {isShowSidebar && <SideNav />}
            <div className={`${!isShowSidebar ? 'w-full' : ''}`}>{children}</div>
          </div>
        </Suspense>
      </div>
    </div>
  );
}