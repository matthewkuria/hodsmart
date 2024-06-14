"use client"
import withAuth from "@/app/lib/withAuth";
import AddAllocationCard from "@/app/ui/allocations/add-allocations";

 const Page =() => {
  return (
      <AddAllocationCard />
    )
  }
export default withAuth(Page);