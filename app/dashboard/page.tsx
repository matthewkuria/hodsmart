"use client"

import { Button } from "@/components/ui/button"
import { auth } from "../firebaseConfig"
import Charts from "../ui/dashboard/home/charts"
import GreetingsComponent from "../ui/dashboard/home/greetings"
import SearchBar from "../ui/dashboard/home/search-component"
import DashboardStatistics from "../ui/dashboard/home/statistics"
import withAuth from "@/app/lib/withAuth"
import { PowerIcon } from '@heroicons/react/24/outline';
import {useRouter} from "next/navigation"
import Avatar from 'react-avatar';
import { useState } from "react"

const Page = () => {
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
    <>
      <div className="flex relative justify-end">
        <Avatar githubHandle="matthewkuria" size={60} round={true} onClick={handleClick}/>
      {isShown &&
        <button className="flex absolute top-5 right-20 h-[48px] w-1/5 grow items-center justify-center rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3">            
            <div className="block">              
              <Button  
              onClick={handleSignOut}  
              ><PowerIcon className="w-6" />Sign Out</Button>
            </div>
          </button>
       }
      </div>
     
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