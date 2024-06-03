"use client"
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { Input } from "@/components/ui/input"
import HodSmartLogo from "../../HodSmartLogo"
export default function SearchBar() {
    return (
        <main className="flex items-center  bg-slate-100 h-20 rounded-md">
        <div className=" hidden md:block px-5">
           <h1 className="text-blue-500 text-3xl">Overview</h1>            
        </div>
        <div className="flex items-center w-full md:w-1/2 gap-2">
            <MagnifyingGlassIcon className='size-6 text-slate-500'/>
            <Input type="search" placeholder="Search for a teacher or subjects" />
        </div>        
    </main>
    )
}