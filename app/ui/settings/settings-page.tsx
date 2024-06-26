"use client";
import BeatLoader from "react-spinners/BeatLoader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import error from "next/error";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { lusitana } from "../fonts";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import router from "next/router";
import { auth, db, storage } from "@/app/firebaseConfig";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import internal from "stream";
import useAuth from "@/app/lib/useAuth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { Alert } from "@/components/ui/alert";
import Loading from "@/app/dashboard/loading";

interface UserData{
  avatar: null | string;
  src: string;
}

const formSchema = z.object({
    emailAddress: z.string().email(),
    password: z.string().min(4).max(16),
    displayName: z.string().min(3)
  })
export default function Settings() {
  const [profilePic, setProfilePic] = useState<UserData | any >('https://via.placeholder.com/150');
  const user: any = useAuth();
  // const [profilePic, setProfilePic] = useState(null);
   const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("")
  const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          emailAddress: "",
            password: "",
            displayName: ""
        },
      })
  //  Define a submit handler.
    useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setEmail(user.email || '');
      console.log(user.photoURL)
    }
  }, [user]);
  const handleProfileUpdate = async (event:any) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      let profilePicURL = user.photoURL;

      if (profilePic) {
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(storageRef, profilePic);
        profilePicURL = await getDownloadURL(storageRef);
      }

      await updateProfile(user, {
        displayName,
        photoURL: profilePicURL,
      });

      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        displayName,
        email,
        photoURL: profilePicURL,
      });

      setSuccess('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  // const handleSubmit = async(values: z.infer<typeof formSchema>) => {
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //      await updateProfile(userCredential.user, { displayName });
  //     // console.log("User signed in:", userCredential.user);
  //     console.log("Sign Up successful")
  //     router.push("/login"); // Redirect to login
  //   } catch (error: any) {
  //     setError(getErrorMessage(error.code))
  //     console.error("Error signing in:",error.code);
  //   }    
  //   console.log(values) 
    
  // }
   // Function to map Firebase error codes to user-friendly messages
  const getErrorMessage = (code: any) => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Email is already in use.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/weak-password':
        return 'Password is too weak.';
      default:
        return 'An error occurred. Please try again.';
    }
  };
   const handleAvatarChange = (event:any) => {  
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  if (loading) {
    return <BeatLoader color="#0d55ed" />;
  }
  return (
    <>
      <div className="avatar-container">        
       <img src={profilePic} alt="Avatar" className="bg-cover rounded-full w-40 h-40" />
      <input type="file" accept="image/*" className="mt-3" onChange={handleAvatarChange} />
      </div>      
      {success && <Alert>{success}</Alert>}
        <Form {...form}>
            {error && <div className="text-red-500">{error }</div >}
            <form onSubmit={handleProfileUpdate} className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <h1 className={`${lusitana.className} mb-3 text-2xl`}>
               Update Profile details
            </h1>
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (               
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Display Name"
                        value={field.value}  
                        onChange={(e) => {
                          // call field.onchange handler
                          field.onChange(e);
                          setDisplayName(e.target.value)
                        }}
                      />
                    </FormControl>                                 
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => (               
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
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
                {loading ? <Button disabled>Updating...</Button> : <Button type="submit">Update Profile</Button>}                
              </div>
            </form>
      </Form>
      </>
    )
}