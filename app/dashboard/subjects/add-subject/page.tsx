"use client"
import withAuth from "@/app/lib/withAuth";
import CreateSubjectsForm from "@/app/ui/subjects/create-subjects";

const AddSubjectsForm =()=> {
    return (
        <CreateSubjectsForm />
    )
}
export default withAuth(AddSubjectsForm);