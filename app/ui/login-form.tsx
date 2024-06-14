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
import {getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import {useRouter} from "next/navigation";
import { useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";



const formSchema = z.object({
    emailAddress: z.string().email(),
    password: z.string().min(4).max(16)
  })
export default function LoginForm() { 
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")
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
      const user = userCredential.user;
        if (loading) {
          return <BounceLoader color="#36d7b7" /> ; // Show spinner while loading
        }
      console.log("Sign in successful")
      router.push("/dashboard"); // Redirect to home or dashboard page
    } catch (error: any) {
      setError(getErrorMessage(error.code))
      console.error("Error signing in:",error.code);
    }  
    finally {
      setLoading(false);
    }
    // console.log(values) 
    
  }
   // Function to map Firebase error codes to user-friendly messages
  const getErrorMessage = (code: any) => {
    switch (code) {
      case 'auth/invalid-credential':
        return 'Incorrect user name or password. Please try again.';     
      default:
        return 'An error occurred. Please try again.';
    }
  };
     
    return(     
      <Form {...form}>
        {error && <div className="text-red-500">{error }</div >}
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
                 <Input type="password" placeholder="password"
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
            <Button
              type="button"
              onClick={() => router.push('/login/signUp')}
              className="bg-transparent  text-black hover:bg-transparent "
            >
                Do not have an account?<span className="underline text-red-500">Sign Up</span> 
              </Button>
          </div>
         </form>
       </Form>
    )
}