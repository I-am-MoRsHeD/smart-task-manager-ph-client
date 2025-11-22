"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { IMember } from "@/types";

interface TeamCapacityChartProps {
    members: IMember[];
}

export default function TeamSummeryChart({ members }: TeamCapacityChartProps) {
    const data = members.map((m) => ({
        name: m.name,
        currentTask: m.currentTask,
        capacity: m.capacity,
    }));

    const getColor = (current: number, capacity: number) => {
        if (current > capacity) return "#dc2626";
        if (current === capacity) return "#f59e0b";
        return "#10b981";
    };

    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Team Workload Summary</CardTitle>
            </CardHeader>

            <CardContent className="h-[350px] w-full mb-16">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />

                        <Bar dataKey="capacity" name="Capacity" fill="#3b82f6" opacity={0.4} />

                        <Bar dataKey="currentTask" name="Current Tasks">
                            {data.map((member, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={getColor(member.currentTask, member.capacity)}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>


                <div className="text-sm mt-7 grid grid-cols-2 lg:grid-cols-4 w-full">
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-sm bg-blue-500 opacity-40"></span> Capacity
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-sm bg-green-500"></span> Below Capacity
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-sm bg-yellow-500"></span> At Capacity
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-sm bg-red-600"></span> Overloaded
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
