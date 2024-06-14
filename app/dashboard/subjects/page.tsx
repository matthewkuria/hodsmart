"use client"
import withAuth from "@/app/lib/withAuth";
import { SubjectsDataTable } from "@/app/ui/subjects-data-table";

const Page =() => {
  return (
      <SubjectsDataTable />
    );
}
export default withAuth(Page);