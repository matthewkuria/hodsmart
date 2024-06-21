"use client";
import withAuth from "@/app/lib/withAuth";
import AddAllocationCard from "@/app/ui/allocations/add-allocations";
const AddAllocationForm =() =>{
    return (
        <AddAllocationCard />
    )
}
export default withAuth(AddAllocationForm);
