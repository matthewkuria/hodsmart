"use client";
// pages/signIn.js

// import { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebaseConfig";
// import { useRouter } from "next/navigation";

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSignIn = async () => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       console.log("User signed in:", userCredential.user);
//       router.push("/dashboard"); // Redirect to home or dashboard page
//     } catch (error:any) {
//       console.error("Error signing in:", error.code, error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Sign In</h1>
//       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
//       <button onClick={handleSignIn}>Sign In</button>
//     </div>
//   );
// };

// export default LoginForm;

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



const formSchema = z.object({
    emailAddress: z.string().email(),
    password: z.string().min(4).max(16)
  })
export default function LoginForm(){    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          emailAddress: "",
          password:"",
        },
      })
        //  Define a submit handler.
  function handleSubmit(values: z.infer<typeof formSchema>) {
    
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
             <Button type="submit">Login</Button>             
          </div>
         </form>
       </Form>
    )
}