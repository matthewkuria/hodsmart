"use client"

import { Button } from "@/components/ui/button"
import { auth } from "../firebaseConfig"
import useAuth from "@/app/lib/useAuth";
import Charts from "../ui/dashboard/home/charts"
import GreetingsComponent from "../ui/dashboard/home/greetings"
import SearchBar from "../ui/dashboard/home/search-component"
import DashboardStatistics from "../ui/dashboard/home/statistics"
import { PowerIcon } from '@heroicons/react/24/outline';
import {useRouter} from "next/navigation"
import Avatar from 'react-avatar';
import { useState } from "react"
import { CameraIcon } from "@heroicons/react/24/solid"
import { SkeletonCard } from "../ui/skeletons/loadingTeacherSkeleton";
import Link from "next/link";


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
          <p className="text-xs font-semibold text-slate-300">{user.email }</p>
        </div>
        <Avatar githubHandle="matthewkuria" size="60" round={true} onClick={handleClick}/>
      {isShown &&
          <div className="absolute top-16 right-0 bg-slate-300 rounded-md p-5">
            <div className="relative w-20">
              <Avatar githubHandle="matthewkuria" size="60" round={true} />
              <div className="">
                <CameraIcon
                  className="w-6 absolute  right-4 bottom-0 fill-blue-500 bg-white rounded"
                   onClick={handleClick}
                />
              </div>
            </div>  
            <div className=" py-5">
               <Link href="/dashboard/settings" ><button className="bg-white px-2 rounded-sm hover:font-semibold">Edit Profile</button></Link>
            </div>
            <button className="flex  w-full grow items-center justify-center rounded-md text-sm font-medium  md:flex-none md:justify-start md:p-2 md:px-0">            
            <div className="block">              
                <Button 
                  className="bg-transparent text-black hover:bg-red-500 hover:text-white"    
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
           
            <SearchBar />
            <GreetingsComponent />
            <div className="flex flex-col">
                <DashboardStatistics />
                <div className="mt-4 rounded-md">
                    <Charts />
                </div>
           </div>
      </main>
      </>
    )
}
export default Page;