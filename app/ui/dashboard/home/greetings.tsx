"use client"
import Image from "next/image"
export default function GreetingsComponent() {
    return (
        <main className=" flex items-center justify-between bg-gradient-to-r from-blue-500 h-40 rounded-lg">
            <div className="flex items-center">
                <h1 className="text-white text-xl">Welcome back,HOD!</h1>
                <p className=""></p>
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
        </main>
    )
}