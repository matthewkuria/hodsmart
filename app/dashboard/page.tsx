"use client"
import React from "react";

import { Button } from "@/components/ui/button"
import { auth } from "../firebaseConfig"
import useAuth from "@/app/lib/useAuth";
import withAuth from "@/app/lib/withAuth"
import Charts from "../ui/dashboard/home/charts"
import GreetingsComponent from "../ui/dashboard/home/greetings"
import SearchBar from "../ui/dashboard/home/search-component"
import DashboardStatistics from "../ui/dashboard/home/statistics"
import { PowerIcon } from '@heroicons/react/24/outline';
import {useRouter} from "next/navigation"
import Avatar from 'react-avatar';
import { Suspense, useState } from "react"
import { CameraIcon } from "@heroicons/react/24/solid"
import { SkeletonCard } from "../ui/skeletons/loadingTeacherSkeleton";
import Link from "next/link";
import Loading from "./loading";


const Page = () => {
  
  const user: any = useAuth();
  const router = useRouter()
  const [isShown, setIshown] = useState(false)
    const handleSignOut = async () => {
    try { 
        await auth.signOut();
         router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  function handleClick() {
     setIshown(prevState => !prevState)
  }
 
  return (
    
    <>{user? (
      <div className="flex relative justify-end">
        <div className="">
          <h1 className="font-bold">{ user.displayName}</h1>
          <h5 className="text-xs font-semibold text-slate-300">{user.email }</h5>
        </div>
        <Avatar githubHandle="matthewkuria" size="60" round={true} onClick={handleClick}/>
      {isShown &&
          <div className="absolute top-16 right-0 bg-slate-200 rounded-md p-4">  
           <div className="">
          <h1 className="font-bold text-white pr-5 py-1 rounded-md bg-blue-500">{ user.displayName}</h1>
          <h5 className="text-xs font-semibold">{user.email }</h5>
        </div>  
            <div className=" py-5">
               <Link href="/dashboard/settings" ><button className="hover:text-blue-500 px-2 rounded-sm hover:font-semibold">Edit Profile</button></Link>
            </div>
            <button className="flex  w-full grow items-center justify-center rounded-md text-sm font-medium  md:flex-none md:justify-start md:p-2 md:px-0">            
            <div className="block">              
                <Button 
                  className="bg-slate-400 text-black hover:bg-red-500 hover:text-white"    
                  onClick={handleSignOut}  
              ><PowerIcon className="w-6" />Log Out</Button>
            </div>
          </button>
        </div>
       }
      </div>) : (
          <>
            <SkeletonCard />
          </>
      )
      }
     
        <main className="bg-slate-100">
           <Suspense fallback={<Loading />}>
            <SearchBar />
            <GreetingsComponent />
            <div className="flex flex-col">
                <DashboardStatistics />
                <div className="mt-4 rounded-md">
                    <Charts />
                </div>
           </div>
           </Suspense>
      </main>
      </>
    )
}
export default withAuth(Page);