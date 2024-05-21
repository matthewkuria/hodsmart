import Image from "next/image";
import { lusitana } from '@/app/ui/fonts';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <h1 className={`${lusitana.className} font-bold`}>HOD Smart</h1>
    </main>
  );
}
