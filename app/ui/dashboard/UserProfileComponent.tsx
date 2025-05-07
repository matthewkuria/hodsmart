"use client"
import React, { useState } from 'react'
import { SkeletonCard } from '../skeletons/loadingTeacherSkeleton'
import Avatar from 'react-avatar'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PowerIcon } from '@heroicons/react/24/outline'
import useAuth from '@/app/lib/useAuth'
import { useRouter } from 'next/navigation'
import { auth } from '@/app/firebaseConfig'
import SearchBar from './home/search-component'

const UserProfileComponent = () => {
    
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
      <div className=" flex w-full items-center justify-between rounded-md px-4 py-2 h-16 ">
        <SearchBar />
          {user ? (
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
    </div>
  )
}

export default UserProfileComponent