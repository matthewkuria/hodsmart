// import "./styles.css";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,PieChart, Pie
} from "recharts";

const data = [
  {
    name: "Maths",
    male: 4000,
    female: 2400,
    amt: 2400,
  },
  {
    name: "Eng",
    male: 3000,
    female: 1398,
    amt: 2210,
  },
  {
    name: "Kiswa",
    male: 2000,
    female: 9800,
    amt: 2290,
  },
  {
    name: "Chem",
    male: 2780,
    female: 3908,
    amt: 2000,
  },
  {
    name: "Bio",
    male: 1890,
    female: 4800,
    amt: 2181,
  },
  {
    name: "Phy",
    male: 2390,
    female: 3800,
    amt: 2500,
  },
  {
    name: "Hist",
    male: 3490,
    female: 4300,
    amt: 2100,
  },
];
const data2 = [
  { name: "Group A", value: "kiswa" },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 }
];

export default function SubjectsCharts() {
  return (
    <main className=" bg-white md:flex">
          <div className="">
            <h3 className="text-xl font-bold">Teachers distribution</h3>
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 10,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip shared={false} trigger="click" />
            <Legend />
            <Bar dataKey="male" fill="#8884d8" />
            <Bar dataKey="female" fill="#82ca9d" />
            </BarChart>
          </div>
          <div className="mx-2">
            <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    startAngle={0}
                    endAngle={360}
                    data={data2}
                    cx={200}
                    cy={200}
                    outerRadius={110}
                    fill="#8884d8"
                    label
                />
            </PieChart>
          </div>
   </main>
  );
}
