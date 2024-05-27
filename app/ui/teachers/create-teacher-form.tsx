"use client"
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

const formSchema = z.object({
    tscNumber:  z.string().min(2).max(50),
    fullName:  z.string().min(2),
    subjects:  z.string().min(2).max(50),
    
})
export function CreateTeacherForm(){
      // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tscNumber: "",
      fullName: "",
      subjects:""
    },
  })
   // 2. Define a submit handler.
   function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="tscNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>TSC Number:</FormLabel>
              <FormControl>
                <Input placeholder="TSC Number" {...field} />
              </FormControl>              
              <FormMessage />
            </FormItem>            
          )}
        />
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
                <FormLabel> Name:</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subjects"
          render={({ field }) => (
            <FormItem>
                <FormLabel>Subject:</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  )
}