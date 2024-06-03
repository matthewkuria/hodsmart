import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";


const formSchema = z.object({
    subCode: z.number(),
    subName: z.string().min(3, {
        message: "Subject name must contain more than 3 characters "
    })
})
export default function AddSubjectsForm() {
     const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subCode: "",
      subName: "",
    },
  })
    return (
        <Form {...form}>

            
        </Form>
    )
}