"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IMember, ITeam } from "@/types";

interface TeamListProps {
    teams: ITeam[];
}

const getStatusColor = (m: IMember) => {
    if (m.currentTask > m.capacity) return "bg-red-500";
    if (m.currentTask === m.capacity) return "bg-yellow-500";
    return "bg-green-500";
};

export default function TeamList({ teams }: TeamListProps) {
    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 px-2 md:px-0">
            {teams.map((team) => (
                <Card key={team._id}>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>{team.name}</CardTitle>
                            <Badge variant="secondary">
                                {team.members.length} Members
                            </Badge>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-2">
                        {team.members.length === 0 && (
                            <p className="text-sm text-gray-500">No team members added yet.</p>
                        )}

                        {team.members.map((m) => (
                            <div
                                key={m.member_no}
                                className="flex justify-between items-center border-b pb-2"
                            >
                                <div>
                                    <p className="font-medium">{m.name}</p>
                                    <p className="text-xs text-gray-500">{m.role}</p>
                                </div>

                                <Badge className={getStatusColor(m)}>
                                    {m.currentTask}/{m.capacity}
                                </Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
