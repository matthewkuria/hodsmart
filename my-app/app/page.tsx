import Image from "next/image";
import { lusitana } from '@/app/ui/fonts';
import HodSmartLogo from "./ui/HodSmartLogo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg p-4 md:h-52 bg-blue-600">
        <HodSmartLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="">
           <h1 className={`${lusitana.className} font-bold text-2xl`}>
            Welcome to HOD smart platform
           </h1>
           <p className="">
           This site is designed to facilitate smooth error-proof way of capturing lesson allocations for your teachers by the HODs during departmental meetings.
           </p>
           <p className="">
           We know that it takes time to share  lessons and capture the allocations, so we'd like to make it worth your while by offering you a smart platform to do it paperlessly.
           </p>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
            <Image
              src="/smart-teacher-desktop.jfif"
              width={1000}
              height={760}
              alt="Smart Hod image for the desktop"
              className="hidden md:block rounded-lg"
             />
             <Image
              src="/smart-teacher-mobile.jfif"
              width={560}
              height={620}
              alt="Smart Hod image for the mobile"
              className="block md:hidden rounded-lg"
             />
        </div>

      </div>
    </main>
  );
}
