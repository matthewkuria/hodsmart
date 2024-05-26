"use client"

import { z } from "zod"

const formSchema = z.object({
    tscNumber:  z.string().min(2).max(50),
    fullName:  z.string().min(2).max(50),
    subjects:  z.string().min(2).max(50),
    
})
