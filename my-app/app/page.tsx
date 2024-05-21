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

        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
            <Image
              src="/smart-teacher-desktop.jfif"
              width={1000}
              height={760}
              alt="Smart Hod image for the desktop"
             />
        </div>

      </div>
    </main>
  );
}
