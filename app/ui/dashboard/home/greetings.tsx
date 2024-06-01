"use client"
import useAuth from "@/app/lib/useAuth";
import { auth } from "@/app/firebaseConfig";
import Image from "next/image"
export default function GreetingsComponent() {
     const user = useAuth();
    return (
        <main className=" flex items-center justify-between bg-gradient-to-r from-blue-500 h-40 rounded-lg mt-3">
            {user ? (
                <>
                <div className="flex flex-col items-center text-white p-5">
                <h1 className=" text-xl font-bold">Welcome back,{user.email}</h1>
                <p className="text-xs mt-3">We know that it takes time and love to choose us.</p>
            </div>
            <div className="">
                {/* Image for the desktop design */}
                <Image
                    src="/teacher-image-desktop.png"
                    alt="Teacher image for desktop"
                    className="hidden md:block rounded-sm mr-10"
                    height={100}
                    width={200}
                />
                {/* Image for the mobile design */}
                <Image
                    src="/teacher-image-mobile.png"
                    alt="Teacher image for desktop"
                    className="md:hidden block rounded-sm mr-10"
                    height={100}
                    width={200}
                />
                    </div>
             </>
            ) : (
                    <h1>Ooops...</h1>
            )}
            
        </main>
    )
}