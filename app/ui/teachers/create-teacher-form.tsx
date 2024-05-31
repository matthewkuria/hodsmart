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
    gender: z.string()
    
})
async function addDataToFireStore(tscNumber:any,fullName:any,subjects:any,gender:any) {
  try {
    const docRef = await addDoc(collection(db, "nwteachers"), {
      tscNumber: tscNumber,
      fullName: fullName,
      subjects: subjects,
      gender:gender
    });
    console.log("Data written succesfully with ID:", docRef.id);
    return true;
  } catch (error) {
    console.log("error adding the teacher", error)
    return false;
  }
}
export function CreateTeacherForm() {
  const [formData, setFormData] = useState({
      tscNumber: "",
      fullName: "",
      subjects: "",
      gender:""
  })
 
  
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };
  // Handle submit to add data to the firebase database
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const added = await addDataToFireStore(tscNumber,fullName,subjects,gender);
    if (added) {      
    confirm("Teacher added successfully!")
    }
    setFormData({
      tscNumber: "",
      fullName: "",
      subjects: "",
      gender:""
    });
  };
  
      // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tscNumber: "",
      fullName: "",
      subjects: "",
      gender:""
    },
  })

  return (
    <Form {...form}>
      <div className=" p-9 bg-slate-50 w-full">        
      <form onSubmit={handleSubmit} className="space-y-4 shadow-md ">
        <Label htmlFor="tscNumber">TSC Number:</Label>
        <Input
          type="text"
            id="tscNumber"
            name="tscNumber"
          value={formData.tscNumber}
            onChange={handleChange}
            required
        />
        <Label htmlFor="fullName">Name:</Label>
        <Input
          type="text"
            id="fullName"
            name="fullName"
          value={formData.fullName}
            onChange={handleChange}
            required
        />
        <Label htmlFor="subjects">Subjects</Label>
        <Input
          type="text"
            id="subjects"
            name="subjects"
          value={formData.subjects}
          onChange={handleChange}
          required
          />
          <div className="w-full">
              <Label htmlFor="gender"></Label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="" selected>--please choose gender--</option>
              <option value="male" >Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        
        <Button type="submit">Save</Button>
        </form>
        <div className="flex pb-2 px-2 items-end justify-end -mt-10">
          <Button className="bg-red-500"><Link href="/dashboard/teachers">Cancel</Link></Button>
        </div>
      </div>
    </Form>
  )
}