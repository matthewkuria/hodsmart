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


const Page = () => {
    const router = useRouter()
    const handleSignOut = async () => {
    try { 
        await auth.signOut();
         router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
    return(
        <main className="bg-slate-100">
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-red-600 md:flex-none md:justify-start md:p-2 md:px-3">            
            <div className="hidden md:block">              
              <Button  
              onClick={handleSignOut}  
              ><PowerIcon className="w-6" />Sign Out</Button>
            </div>
          </button>
            <SearchBar />
            <GreetingsComponent />
            <div className="flex flex-col">
                <DashboardStatistics />
                <div className="mt-4 rounded-md">
                    <Charts />
                </div>
           </div>
        </main>
    )
}
export default withAuth(Page);