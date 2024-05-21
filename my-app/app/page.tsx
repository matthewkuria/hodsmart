import Image from "next/image";
import { lusitana } from '@/app/ui/fonts';
import HodSmartLogo from "./ui/HodSmartLogo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg p-4 md:h-52 bg-blue-600">
        <HodSmartLogo />
      </div>
    </main>
  );
}
