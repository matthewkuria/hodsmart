"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import useFetchData from "@/app/lib/data"
import { SkeletonCard } from "./skeletons/loadingTeacherSkeleton"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React from "react"


export default function DataTable() {
  const { data, loading } = useFetchData();
  console.log(data)

  if (loading) {
    return (
      <SkeletonCard />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>TSC NO: </TableCell>
          <TableCell>Full Name</TableCell>
          <TableCell>Subjects Taught</TableCell>
          {/* Add more headers as needed */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.tscNumber}</TableCell>
            <TableCell>{item.fullName}</TableCell>
            <TableCell>{item.subjects}</TableCell>
            {/* Add more cells as needed */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

