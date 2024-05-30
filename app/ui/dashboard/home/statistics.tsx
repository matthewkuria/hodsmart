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

export default function DashboardStatistics() {
    return (
        <main className="hidden md:flex justify-around h-40 w-3/4 mt-4 bg-white p-3 ">
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
                    <h3 className="font-bold">66</h3>
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
                    <h3 className="font-bold">14</h3>
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
                    <h3 className="font-bold">66</h3>
                </CardContent>                               
            </Card>
        </main>
    )
}