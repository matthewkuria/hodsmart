"use client"

import { auth } from "../firebaseConfig"
import Charts from "../ui/dashboard/home/charts"
import GreetingsComponent from "../ui/dashboard/home/greetings"
import SearchBar from "../ui/dashboard/home/search-component"
import DashboardStatistics from "../ui/dashboard/home/statistics"
import withAuth from "@/app/lib/withAuth"

const Page = () => {
    const handleSignOut = async () => {
    await auth.signOut();
  };
    return(
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
    )
}
export default withAuth(Page)