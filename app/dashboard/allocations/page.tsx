"use client"
import withAuth from "@/app/lib/withAuth";
import AllocationsDataTable from "@/app/ui/allocations-table";

 const Page =() => {
  return (
     <AllocationsDataTable />
    )
  }
export default withAuth(Page);