"use client"
import { db } from "../../firebaseConfig";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
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
  numberOfLessons: z.string().min(1,{
    message: "Please select the number of lessons.",
    
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
      numberOfLessons: "",

  } as any)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teacherName: "",
      classesTaught: [],
      subjects:[],
      numberOfLessons: "",

    },
    })
  const handleChange = async( checked: any, id:any, subCode:any) => { 
    console.log('Checkbox state changed:', checked);
     console.log('Subject code:', subCode);
     const newSelectedSubjects = checked
      ? [...formData.subjects,id]
      : formData.subjects.filter((value: any) => value !== id);
      setFormData((prevFormData: any) => ({
      ...prevFormData,
      subjects: newSelectedSubjects
      }));
     
  };
  const handleChangeTwo = (checked: any,id: any, className: string ) => {
     const newSelectedClasses = checked
      ? [...formData.classesTaught,className]
      : formData.classesTaught.filter((value: any) => value !== id);
      setFormData((prevFormData: any) => ({
      ...prevFormData,
      classesTaught: newSelectedClasses
      }));
  };
 const handleInputChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
   console.log("changed to:",value)
  };
  const handleSelectChange = (event:any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,  
    });
  };
    const handleSubmit = async (e:any) => {
    e.preventDefault();
    const documentData = {
       teacherName: formData.teacherName,
      classesTaught: formData.classesTaught,
      subjects: formData.subjects,
      numberOflessons: formData.numberOfLessons
    };
    const collectionName = 'allocations';  // Specify your collection name here
     await addAllocation(collectionName, documentData);    
      alert("Allocation done successfully!")    
    // Reset the form
    setFormData({
      teacherName: "",
      classesTaught: [],
      subjects: [],
      numberOfLessons:""
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
                            onChange={handleInputChange}
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
                          <div key={subject.id}>
                            <label>
                              <input
                                type="checkbox"
                                checked={formData.subjects.includes(subject.subName)}
                                onChange={(e) => handleChange(e.target.checked,subject.subName,subject.id)}
                              />
                              {subject.subName}
                            </label>
                          </div>
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
                        {schData.map((stream) => (
                          <div key={stream.id}>
                            <label>
                              <input                               
                                type="checkbox"
                                checked={formData.classesTaught.includes(stream.className)}
                                onChange={(e) => handleChangeTwo(e.target.checked,stream.id,stream.className)}
                              />
                              {stream.className}
                            </label>
                          </div>
                        ))}               
                        
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="p-2">                     
                    <label htmlFor="numberOfLessons">Number of Lessons</label>
                    <select  
                      id="numberOfLessons" 
                      name="numberOfLessons"  
                      onChange={handleSelectChange}
                      value={formData.numberOfLessons}
                      required
                    >                      
                        <option value="0">--Select the number of lessons--</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>                      
                    </select> 
                    <FormMessage />
                </div>
           <div className="flex items-end justify-end">
             <Button type="submit">Allocate</Button>
           </div>
        </form>
        </Form>
     </main>
 )
}