"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ClipboardList, AlertTriangle } from "lucide-react";

interface DashboardStatsProps {
    totalProjects: number;
    totalTasks: number;
    overloadedMembers: number;
}

export default function DashboardStats({
    totalProjects,
    totalTasks,
    overloadedMembers,
}: DashboardStatsProps) {
    const stats = [
        {
            label: "Total Projects",
            value: totalProjects,
            icon: <ClipboardList className="h-6 w-6 text-blue-600" />,
        },
        {
            label: "Total Tasks",
            value: totalTasks,
            icon: <Users className="h-6 w-6 text-emerald-600" />,
        },
        {
            label: "Overloaded Members",
            value: overloadedMembers,
            icon: (
                <AlertTriangle
                    className={`h-6 w-6 ${overloadedMembers > 0 ? "text-red-600" : "text-gray-400"
                        }`}
                />
            ),
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((item) => (
                <Card
                    key={item.label}
                    className="p-4 shadow-sm hover:shadow-md transition rounded-xl"
                >
                    <CardHeader className="flex flex-row items-center justify-between p-0 mb-3">
                        <CardTitle className="text-base font-medium">
                            {item.label}
                        </CardTitle>
                        {item.icon}
                    </CardHeader>

                    <CardContent className="p-0">
                        <p className="text-3xl font-bold">{item.value || 0}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
