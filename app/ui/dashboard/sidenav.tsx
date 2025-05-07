import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import HodSmartLogo from '../HodSmartLogo';
import Image from 'next/image';

export default function SideNav() { 
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 mt-16 fixed top-0 left-0 w-16 md:w-64 z-10">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/dashboard"
      >
        <div className="w-full text-white md:w-40">
          <HodSmartLogo />
        </div>
        <Image
          src="/smart-hod.png"
          alt='Smart HOD image icon for the desktop logo'
          width={100}
          height={100}
          className="hidden md:block"
        />
         <Image
          src="/smart-hod.png"
          alt='Smart HOD image icon for the mobile logo'
          width={50}
          height={50}
          className="md:hidden block"
        />
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-200 md:block"></div>
        <form  action={async () => {
            'use client';
            
          }}>          
        </form>        
      </div>
    </div>
  );
}
