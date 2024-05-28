import { Payment, columns } from "./columns"
import  DataTable  from "@/app/ui/data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",     
      tscNumber: 6060907,
      fullName: "John Doe",
      subjects: "math/phy"
    },
    {
      id: "728ed52f",     
      tscNumber: 6060306,
      fullName: "Matthew Kuria",
      subjects: "math/phy"
    },
    {
      id: "728ed52f",     
      tscNumber: 6060907,
      fullName: "John Doe",
      subjects: "math/phy"
    },
    {
      id: "728ed52f",     
      tscNumber: 6060907,
      fullName: "John Doe",
      subjects: "math/phy"
    },
    {
      id: "728ed52f",     
      tscNumber: 6060907,
      fullName: "John Doe",
      subjects: "math/phy"
    },
    {
      id: "728ed52f",     
      tscNumber: 6060907,
      fullName: "John Doe",
      subjects: "math/phy"
    },
    {
      id: "728ed52f",     
      tscNumber: 6060907,
      fullName: "John Doe",
      subjects: "math/phy"
    },
    {
      id: "728ed52f",     
      tscNumber: 6060907,
      fullName: "John Doe",
      subjects: "math/phy"
    },
    {
      id: "728ed52f",     
      tscNumber: 6060907,
      fullName: "John Doe",
      subjects: "math/phy"
    },
    {
      id: "728ed52f",     
      tscNumber: 6060907,
      fullName: "John Doe",
      subjects: "math/phy"
    },
    {
      id: "728ed52f",     
      tscNumber: 6060907,
      fullName: "John Doe",
      subjects: "math/phy"
    },
    {
      id: "728ed52f",     
      tscNumber: 6060907,
      fullName: "John Doe",
      subjects: "math/phy"
    },
    {
      id: "728ed52f",     
      tscNumber: 6060907,
      fullName: "John Doe",
      subjects: "math/phy"
    },

   
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable  />
    </div>
  )
}
