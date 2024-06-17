"use client"
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import schData from "@/app/lib/sch-classes";
import subTaughtData from "@/app/lib/subjects-taught";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  numberOfLessons: z.string({
    required_error: "Please select the number of lessons.",
    
  })
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
  const [formData, setFormData] = useState({
      teacherName: "",
      subjects: [],
      classesTaught: [],
      numberOflessons: "",

  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teacherName: "",
      classesTaught: [],
      subjects:[],
      numberOfLessons: "",

    },
    })
  //  create handleChange function to collect data when there is a change
  const handleChange = (e: any) => {    
    const { name, value, checked } = e.target;   
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      if(checked: any) {
        subjects:[...prevFormData.subjects, value]
      }
    }));
      console.log(formData)
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
      classesTaught: [],
      subjects: [],
      numberOflessons:""
    });
  };
    
   
    return (
     <main>
        <Form {...form} >
            <form onSubmit={handleSubmit} className="md:flex md:justify-around mt-5">
                <div className="p-2">
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
                </div>
                <div className="p-2">
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
                        {subTaughtData.map((subject) => (
                          <FormField
                            key={subject.id}
                            control={form.control}
                            name="subjects"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={subject.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox 
                                      value={field.value}  
                                      checked={field.value?.includes(subject.id)}
                                      onCheckedChange={handleChange}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {subject.subName}
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
                </div>
                <div className="p-2">
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
                </div>
                <div className="p-2">
                  <FormField
                    control={form.control}
                    name="numberOfLessons"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Lessons</FormLabel>
                        <Select                
                          onValueChange={handleChange}
                          defaultValue={formData.numberOflessons}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the number of lessons" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="6">6</SelectItem>
                            <SelectItem value="7">7</SelectItem>
                            <SelectItem value="8">8</SelectItem>
                            <SelectItem value="9">9</SelectItem>
                            <SelectItem value="10">10</SelectItem>                  
                          </SelectContent>
                        </Select>              
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
           <div className="flex items-end justify-end">
             <Button type="submit">Allocate</Button>
           </div>
        </form>
        </Form>
     </main>
 )
}