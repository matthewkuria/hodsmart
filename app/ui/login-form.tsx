"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { lusitana } from "./fonts"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link";


const formSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(2).max(16)
  })
export default function LoginForm(){
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          password:"",
        },
      })
        //  Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.  
    console.log(values) 
    toast({
        description: "Login Successful welcome!",
      })
  }
     
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
                 <FormLabel>User Name</FormLabel>
                 <FormControl>
                   <Input placeholder="username" {...field} />
                 </FormControl>                                 
                 <FormMessage />
               </FormItem>
             )}
           />
           <FormField
           control={form.control}
           name="password"
           render={({field})=>(
            <FormItem>
                <FormLabel>PassWord</FormLabel>
                    <FormControl>
                        <Input placeholder="password" {...field} />
                    </FormControl> 
                <FormMessage />
            </FormItem>
           )}
            />
          <div className="mt-5 flex items-center justify-end">
             <Link href='/dashboard'>
             <Button type="submit">Submit</Button>
             </Link>
          </div>
         </form>
       </Form>
    )
}