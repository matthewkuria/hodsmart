import Image from "next/image";
import { lusitana } from '@/app/ui/fonts';
import HodSmartLogo from "./ui/HodSmartLogo";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="">
        <HodSmartLogo />
      </div>
    </main>
  );
}
