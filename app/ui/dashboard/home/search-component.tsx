"use client"
import { Input } from "@/components/ui/input"
import HodSmartLogo from "../../HodSmartLogo"
export default function SearchBar() {
    return (
        <main className="flex items-center  bg-slate-100 h-20 rounded-md">
        <div className=" hidden md:block px-5">
           <h1 className="text-blue-500 text-3xl">Dashboard</h1>            
        </div>
        <div className="w-full">
            <Input type="search" placeholder="Search for a teacher or subjects" />
        </div>        
    </main>
    )
}