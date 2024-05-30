"use client"
import { db } from "../../firebaseConfig"
import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { Label } from "@radix-ui/react-label";
import Link from "next/link";

const formSchema = z.object({
    tscNumber:  z.string().min(2).max(50),
    fullName:  z.string().min(2),
    subjects:  z.string().min(2).max(50),
    
})
async function addDataToFireStore(tscNumber: any, fullName: any, subjects: any) {
  try {
    const docRef = await addDoc(collection(db, "teachers"), {
      tscNumber: tscNumber,
      fullName: fullName,
      subjects: subjects
    });
    console.log("Data written succesfully with ID:", docRef.id);
    return true;
  } catch (error) {
    console.log("error adding the teacher", error)
    return false;
  }
}
export function CreateTeacherForm() {
  const [formData, setFormData] = useState([])
  const [tscNumber, setTscNumber] = useState("");
  const [fullName, setfullName] = useState("");
  const [subjects, setsubjects] = useState("");
  
      // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tscNumber: "",
      fullName: "",
      subjects:""
    },
  })
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const added = await addDataToFireStore(tscNumber, fullName, subjects);
    if (added) {
      setTscNumber("");
      setfullName("");
      setsubjects("");
      confirm("Teacher added successfully!")
    }

   
 }

  return (
    <Form {...form}>
      <div className=" p-9 bg-slate-50 w-full">        
      <form onSubmit={handleSubmit} className="space-y-4 shadow-md ">
        <Label htmlFor="tscNumber">TSC Number:</Label>
        <Input
          type="text"
          id="tscNumber"
          value={tscNumber}
            onChange={(e) => setTscNumber(e.target.value)}
            required
        />
        <Label htmlFor="fullName">Name:</Label>
        <Input
          type="text"
          id="fullName"
          value={fullName}
            onChange={(e) => setfullName(e.target.value)}
            required
        />
        <Label htmlFor="subjects">Subjects</Label>
        <Input
          type="text"
          id="subjects"
          value={subjects}
          onChange={(e) => setsubjects(e.target.value)}
          required
          />
        
        <Button type="submit">Save</Button>
        </form>
        <div className="flex pb-2 px-2 items-end justify-end -mt-10">
          <Button className="bg-red-500"><Link href="/dashboard/teachers">Cancel</Link></Button>
        </div>
      </div>
    </Form>
  )
}