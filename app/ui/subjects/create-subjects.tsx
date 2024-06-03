"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import { db } from "../../firebaseConfig"
import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import Link from "next/link";


const formSchema = z.object({
  subCode: z.string().min(3, {
      message: "Subject must be more than 3 numbers"
    }),
    subName: z.string().min(3, {
        message: "Subject name must contain more than 3 characters "
    })
})
// Function to add a subject to the specified collection
const addSubject = async (collectionName:any, documentData:any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), documentData);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
export default function CreateSubjectsForm() {
  const [formData, setFormData] = useState({
    subCode: "",
    subName:""
  })
     const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subCode: "",
      subName: "",
    },
     })
   // create handleChange function to collect data when there is a change
  const handleChange = (e: any) => {    
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };
  const handleSubmit = async(e: any) => {
    e.preventDefault();
       const documentData = {
         subCode: formData.subCode,
         subName: formData.subName
    };
    const collectionName = 'subjects';  // Specify your collection name here
     await addSubject(collectionName, documentData);    
      alert("Subject added successfully!")    
    // Reset the form
    setFormData({
      subCode: "",
      subName: ""
    });
 }
    return (
      <Form {...form} >
        <div className="max-w-md ">
      <form onSubmit={handleSubmit} className="space-y-8 max-w-md">
        <FormField
          control={form.control}
          name="subCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="subCode">Subject Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="subject code"
                  type="text"
                  name="subCode"
                  id="subCode"
                  onChange={handleChange }
                  value={formData.subCode}
                  required
                />
              </FormControl>              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subName"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="subName">Subject Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Name of the subject"
                  type="text"
                  name="subName"
                  id="subName"
                  onChange={handleChange }
                  value={formData.subName}
                  required
                />
              </FormControl>              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
        </form>
          <div className="flex pb-2 px-2 items-end justify-end -mt-10">
          <Button className="bg-red-500"><Link href="/dashboard/subjects">Cancel</Link></Button>
          </div>
          </div>
      </Form>
      
  )
}