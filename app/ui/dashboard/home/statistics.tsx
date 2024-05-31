"use client"

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
    CardFooter    
} from "@/components/ui/card"
import Image from "next/image"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { db } from "@/app/firebaseConfig"
import { collection, getCountFromServer, getFirestore } from "firebase/firestore"
import { useEffect, useState } from "react"


export default function DashboardStatistics() {
    const [teachersCount, setTeachersCount] = useState(0)
    const [subjectsCount, setsubjectsCount] = useState(0)
    useEffect(() => {
        
    },[])
    return (
        <main className="hidden md:flex justify-around h-40 w-3/4 mt-4 p-3 ">
           <Card className="  items-center rounded-lg  w-[150px] h-[150px] mx-4 p-4  hover:border-blue-500 hover:shadow-lg">
                <CardHeader>
                    <CardTitle>Teachers</CardTitle>                   
                </CardHeader>
                <CardContent className=" flex flex-col mx-auto items-center">
                    <Image
                        src="/teacher-icon.png"
                        alt=""
                        width={120}
                        height={150}
                        className="justify-center"
                    />
                    <h3 className="font-bold">{ teachersCount}</h3>
                </CardContent>                               
            </Card>
            <Card className="bg-white  items-center rounded-lg  w-[150px] h-[150px] mx-4 p-4  hover:border-blue-500 hover:shadow-lg">
                <CardHeader>
                    <CardTitle>Subjects</CardTitle>                   
                </CardHeader>
                <CardContent className=" flex flex-col mx-auto items-center">
                    <Image
                        src="/subjects.png"
                        alt=""
                        width={120}
                        height={150}
                        className="justify-center"
                    />
                    <h3 className="font-bold">{ subjectsCount}</h3>
                </CardContent>                               
            </Card>
            <Card className="bg-blue-50  items-center rounded-lg  w-[250px] h-[150px] mx-4 p-4  hover:border-blue-500 hover:shadow-lg">
                <CardHeader>
                    <CardTitle>View Subjects allocations</CardTitle>                   
                </CardHeader>
                <CardContent className=" flex flex-col mx-auto items-center">
                    <Image
                        src="/teacher-icon.png"
                        alt=""
                        width={120}
                        height={150}
                        className="justify-center"
                    />
                    <ArrowRightIcon className="size-5 animate-bounce"/>
                </CardContent>                               
            </Card>
        </main>
    )
}