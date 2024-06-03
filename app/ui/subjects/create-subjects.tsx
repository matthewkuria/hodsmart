"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import { db } from "../../firebaseConfig"
import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";


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
  const [formData, setFormdata] = useState({
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
    
    function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
    return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-md">
        <FormField
          control={form.control}
          name="subCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject Code</FormLabel>
              <FormControl>
                <Input placeholder="subject code" {...field} />
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
              <FormLabel>Subject Name</FormLabel>
              <FormControl>
                <Input placeholder="Name of the subject" {...field} />
              </FormControl>              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}