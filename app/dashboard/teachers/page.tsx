"use client"
import withAuth from "@/app/lib/withAuth"
import  DataTable  from "@/app/ui/data-table"
 const Page = async () => {
  return (
    <div className="container mx-auto py-10">
      <DataTable  />
    </div>
  )
}
export default withAuth(Page);