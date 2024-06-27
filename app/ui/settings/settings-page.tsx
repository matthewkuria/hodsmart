"use client";
import BeatLoader from "react-spinners/BeatLoader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { lusitana } from "../fonts";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile, updateEmail, updatePassword } from "firebase/auth";
import router from "next/router";
import { auth, db, storage } from "@/app/firebaseConfig";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import internal from "stream";
import useAuth from "@/app/lib/useAuth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { Alert } from "@/components/ui/alert";
import Loading from "@/app/dashboard/loading";
import withAuth from "@/app/lib/withAuth";

interface UserData{
  avatar: null | string;
  src: string;
}

const formSchema = z.object({
    emailAddress: z.string().email(),
    password: z.string().min(4).max(16),
    displayName: z.string().min(3)
  })
const Settings = () => {
  const [profilePic, setProfilePic] = useState<UserData | any>('https://via.placeholder.com/150');
  const [profilePicURL, setProfilePicURL] = useState('');
  const user: any = useAuth();
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
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
      console.log(user)
      const fetchUserData = async () => {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setDisplayName(userData.displayName || '');
            setEmail(userData.email || '');
            setProfilePicURL(userData.photoURL || '');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    }
  }, [user]);
  const handleProfileUpdate = async (event: any) => {
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
  const handleAvatarChange = (event: any) => {
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
        {profilePic && <img src={profilePic} alt="Profile Picture" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />}
        <input type="file" accept="image/*" className="mt-3" onChange={handleAvatarChange} />
      </div>
      {success && <Alert>{success}</Alert>}
      <Form {...form}>
        {error && <div className="text-red-500">{error}</div >}
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
                    value={displayName}
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
                    value={email}
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>PassWord</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password"
                    value={password}
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
};
Settings.displayName = 'Settings';
export default withAuth(Settings);