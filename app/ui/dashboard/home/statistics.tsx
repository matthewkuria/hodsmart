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
        <main className="bg-slate-50 h-56 mt-4">
           <Card className="bg-white flex flex-col items-center rounded-lg border w-[150px] h-[150px] p-4 hover:border-blue-500 shadow-lg">
                <CardHeader>
                    <CardTitle>Teachers</CardTitle>                   
                </CardHeader>
                <CardContent>
                    <Image
                        src="/teacher-icon.png"
                        alt=""
                        width={120}
                        height={150}
                    />
                    <h3 className="text-blue-500">66</h3>
                </CardContent>                               
            </Card>
        </main>
    )
}