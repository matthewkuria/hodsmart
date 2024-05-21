"use client";
import { z } from "zod";
import { lusitana } from "./fonts"


const formSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(8)
  })
export default function LoginForm(){
    return(
        <form >
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <h1 className={`${lusitana.className} mb-3 text-2xl`}>
                 Please log in to continue.
            </h1>

            </div>

        </form>
    )
}