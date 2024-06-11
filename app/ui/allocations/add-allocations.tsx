"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"

const formSchema = z.object({
  teachername: z.string().min(2, {
    message: "Teacher's name must be at least 3 characters.",
  }),
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})
export default function AddAllocationCard() {
  const [teachername, setTeacherName] = useState("")
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teachername: "",
    },
    })
     function handleSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
    return (
     <main>
        <Form {...form} >
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                    control={form.control}
                    name="teachername"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Teacher</FormLabel>
                        <FormControl>
                          <Input placeholder="Teacher's Name"
                            name="teachername"
                            value={field.value}
                            onChange={(e) => {
                          // call field.onchange handler
                          field.onChange(e);
                          setTeacherName(e.target.value)
                        }}
                          />
                        </FormControl>                        
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <Button type="submit">Allocate</Button>
            </form>
        </Form>
     </main>
 )
}