"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getDateTime } from "@/lib/getDateTime";
import { ArrowRight } from "lucide-react";

interface ReassignHistoryProps {
    logs: {
        taskId: {
            title: string
        };
        fromMember: {
            name: string;
        };
        toMember: {
            name: string;
        };
        changedAt: string;
    }[];
}

export default function ReassignHistory({ logs }: ReassignHistoryProps) {
    const recent = logs.slice(0, 5);

    return (
        <Card className="mt-6 shadow-sm rounded-xl">
            <CardHeader>
                <CardTitle>Recent Reassignments</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
                {recent.length === 0 ? (
                    <p className="text-sm text-gray-500">No task reassignments yet.</p>
                ) : (
                    recent.map((log, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border"
                        >
                            <div className="text-sm">
                                <strong>{log?.taskId?.title}</strong>
                                <div className="text-xs text-gray-600">
                                    {getDateTime(log?.changedAt)}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-red-500">{log.fromMember?.name}</span>
                                <ArrowRight className="h-4 w-4" />
                                <span className="text-emerald-600">{log.toMember?.name}</span>
                            </div>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
}
