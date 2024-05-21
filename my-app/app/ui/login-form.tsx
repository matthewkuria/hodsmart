"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { lusitana } from "./fonts"


const formSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(8)
  })
export default function LoginForm(){
    return(     
         <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
         <h1 className={`${lusitana.className} mb-3 text-2xl`}>
                 Please log in to continue.
            </h1>
           <FormField
             control={form.control}
             name="username"
             render={({ field }) => (
               <FormItem>
                 <FormLabel>Username</FormLabel>
                 <FormControl>
                   <Input placeholder="shadcn" {...field} />
                 </FormControl>
                 <FormDescription>
                   This is your public display name.
                 </FormDescription>
                 <FormMessage />
               </FormItem>
             )}
           />
           <Button type="submit">Submit</Button>
         </form>
       </Form>
    )
}