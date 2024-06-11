"use client"
import { db } from "../../firebaseConfig"
import { collection, addDoc } from "firebase/firestore";
import schData from "@/app/lib/sch-classes"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"

const formSchema = z.object({
  teacherName: z.string().min(2, {
    message: "Teacher's name must be at least 3 characters.",
  }),
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one class.",
  }),
  numberOfLessons: z.string()
})
export default function AddAllocationCard() {
  const [formData, setFormData] = useState({
      teacherName: "",
      fullName: "",
      subjects: "",
      gender:""
  })
   // create handleChange function to collect data when there is a change
  const handleChange = (e: any) => {    
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };
    const handleSubmit = async (e:any) => {
    e.preventDefault();
    const documentData = {
       teacherName: formData.teacherName,
      fullName: formData.fullName,
      subjects: formData.subjects,
      gender: formData.gender
    };
    const collectionName = 'teachers';  // Specify your collection name here
    //  await addTeacher(collectionName, documentData);    
      alert("Teacher added successfully!")    
    // Reset the form
    setFormData({
      teacherName: "",
      fullName: "",
      subjects: "",
      gender:"male"
    });
  };
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teacherName: "",
      items:[]
    },
    })
   
    return (
     <main>
        <Form {...form} >
            <form onSubmit={form.handleSubmit(handleSubmit)} className="md:flex">
                <FormField
                    control={form.control}
                    name="teacherName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Teacher</FormLabel>
                        <FormControl>
                          <Input placeholder="Teacher's Name"
                            name="teachername"
                            value={formData.value}
                            onChange={ handleChange}/>
                        </FormControl>                        
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Classes</FormLabel>
                <FormDescription>
                  Select the classes taught.
                </FormDescription>
              </div>
              {schData.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
            />
            <div className="w-full">
              <Label htmlFor="gender"></Label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >     
            <option value="">--Choose Gender--</option>  
              <option value="male" >Male</option>
              <option value="female">Female</option>
            </select>
          </div>
                    <Button type="submit">Allocate</Button>
            </form>
        </Form>
     </main>
 )
}