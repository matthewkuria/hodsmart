"use client"
import { db } from "../../firebaseConfig"
import { collection, addDoc } from "firebase/firestore";
import useFetchSubjectData from "@/app/lib/subject-data";
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
    subjects: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one class.",
  }),
    classesTaught: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one class.",
  }),
  numberOfLessons: z.string()
})
// Function to add a document to a specified collection
const addAllocation = async (collectionName:any, documentData:any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), documentData);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export default function AddAllocationCard() {
  const { data, loading } = useFetchSubjectData(); 
  const [formData, setFormData] = useState({
      teacherName: "",
      numberOflessons: "",
      subjects: "",
      classesTaught:""
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teacherName: "",
      classesTaught: [],
      subjects:[],
      numberOfLessons: "1",

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
    const handleSubmit = async (e:any) => {
    e.preventDefault();
    const documentData = {
       teacherName: formData.teacherName,
      classesTaught: formData.classesTaught,
      subjects: formData.subjects,
      numberOflessons: formData.numberOflessons
    };
    const collectionName = 'allocations';  // Specify your collection name here
     await addAllocation(collectionName, documentData);    
      alert("Allocation done successfully!")    
    // Reset the form
    setFormData({
      teacherName: "",
      classesTaught: "",
      subjects: "",
      numberOflessons:""
    });
  };
    
   
    return (
     <main>
        <Form {...form} >
            <form onSubmit={handleSubmit} className="md:flex justify-around mt-5">
                <FormField
                    control={form.control}
                    name="teacherName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Teacher</FormLabel>
                        <FormControl>
                          <Input placeholder="Teacher's Name"
                            name="teacherName"
                            id="teacherName"
                            value={formData.teacherName}
                            onChange={handleChange}
                            required
                            className="md: mx-5"
                          />
                            
                        </FormControl>                        
                        <FormMessage />
                        </FormItem>
                    )}
            />
            <FormField
          control={form.control}
          name="subjects"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Subjects</FormLabel>
                <FormDescription>
                  Select the Subjects taught.
                </FormDescription>
              </div>
              {data.map((subject) => (
                <FormField
                  key={subject["id"]}
                  control={form.control}
                  name="subjects"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={subject["id"]}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(subject["subCode"])}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, subject["subCode"]])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== subject["subCode"]
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {subject["subName"]}
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
                <FormField
          control={form.control}
          name="classesTaught"
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
                  name="classesTaught"
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
              <Label htmlFor="numberOfLessons"></Label>
            <select
              id="numberOfLessons"
              name="numberOfLessons"
              value={formData.numberOflessons}
              onChange={handleChange}
              required
            >     
            <option value="0">--The number of Lessons--</option>  
              <option value="1" >1</option>
              <option value="2" >2</option>
              <option value="3" >3</option>
              <option value="4" >4</option>
              <option value="5" >5</option>
              <option value="6" >6</option>
              <option value="7" >7</option>
              <option value="8" >8</option>
              <option value="9" >9</option>
              <option value="10" >10</option>
              
            </select>
          </div>
                    <Button type="submit">Allocate</Button>
            </form>
        </Form>
     </main>
 )
}