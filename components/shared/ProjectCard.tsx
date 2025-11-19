"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IProject } from "@/types";
import Link from "next/link";


const ProjectCard = ({ project }: { project: IProject }) => {
    return (
        <Card className="rounded-2xl shadow-md border border-black/20 min-w-[260px]">
            <CardHeader>
                <CardTitle className="text-lg font-semibold">{project?.name}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 text-sm font-medium">
                <p><span className="font-semibold">Team:</span> {project?.linkedTeam?.name}</p>
                <p><span className="font-semibold">Team members:</span> {project?.linkedTeam?.members?.length}</p>
                <p><span className="font-semibold">Total Tasks:</span> {project?.tasks?.length}</p>
            </CardContent>

            <CardFooter>
                <Link href={`/user/project/${project?._id}`}>
                    <Button
                        className="w-full bg-foreground hover:bg-muted-foreground text-white font-semibold"
                    >
                        See details
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
};

export default ProjectCard;
