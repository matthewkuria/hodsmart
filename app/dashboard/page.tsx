"use client"
import React from "react";

import { Button } from "@/components/ui/button"

import useAuth from "@/app/lib/useAuth";
import withAuth from "@/app/lib/withAuth"
import Charts from "../ui/dashboard/home/charts"
import GreetingsComponent from "../ui/dashboard/home/greetings"
import SearchBar from "../ui/dashboard/home/search-component"
import DashboardStatistics from "../ui/dashboard/home/statistics"
import { PowerIcon } from '@heroicons/react/24/outline';
import {useRouter} from "next/navigation"
import Avatar from 'react-avatar';
import { Suspense, useState } from "react"
import { CameraIcon } from "@heroicons/react/24/solid"
import { SkeletonCard } from "../ui/skeletons/loadingTeacherSkeleton";
import Link from "next/link";
import Loading from "./loading";


const Page = () => {
  return (
        <main className="mt-1.5 w-full h-full overflow-y-auto">
           <Suspense fallback={<Loading />}>
            <GreetingsComponent />
            <div className="flex flex-col">
                <DashboardStatistics />
                <div className="mt-4 rounded-md">
                    <Charts />
                </div>
           </div>
           </Suspense>
      </main>
    )
}
export default withAuth(Page);