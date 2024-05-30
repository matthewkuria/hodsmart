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
        <main className="bg-slate-100 h-56 mt-4">
           <Card className="bg-white  items-center rounded-lg  w-[150px] h-[150px] m-4 p-4 border-4 border-blue-400 hover:border-blue-500 hover:shadow-lg">
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
        </main>
    )
}