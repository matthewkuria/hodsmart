"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { lusitana } from "./fonts"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl, 
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import {useRouter} from "next/navigation";
import { useState } from "react";



const formSchema = z.object({
    emailAddress: z.string().email(),
    password: z.string().min(4).max(16)
  })
export default function LoginForm() { 
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          emailAddress: "",
          password:"",
        },
      })
        //  Define a submit handler.
  const handleSubmit = async(values: z.infer<typeof formSchema>) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // console.log("User signed in:", userCredential.user);
      console.log("Sign in successful")
      router.push("/dashboard"); // Redirect to home or dashboard page
    } catch (error:any) {
      console.error("Error signing in:", error.code, error.message);
    }    
    console.log(values) 
    
  }
     
    return(     
         <Form {...form}>
         <form onSubmit={form.handleSubmit(handleSubmit)} className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
         <h1 className={`${lusitana.className} mb-3 text-2xl`}>
            Please log in to continue.
         </h1>
           <FormField
             control={form.control}
             name="emailAddress"
            render={({ field }) => (               
               <FormItem>
                 <FormLabel>User Name</FormLabel>
                 <FormControl>
                   <Input placeholder="Email Address"
                    value={field.value}  
                    onChange={(e) => {
                      // call field.onchange handler
                      field.onChange(e);
                      setEmail(e.target.value)
                    }}
                   />
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
                 <Input placeholder="password"
                   value={field.value} 
                   onChange={(e) => {
                     field.onChange(e);
                     setPassword(e.target.value)
                   }}
                 />
                    </FormControl> 
                <FormMessage />
            </FormItem>
           )}
            />
          <div className="mt-5 flex items-center justify-end">             
             <Button type="submit">Login</Button>             
          </div>
         </form>
       </Form>
    )
}