/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shuffle } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ReassignSectionProps {
    onReassign: () => Promise<any>;
}

const ReassignSection = ({ onReassign }: ReassignSectionProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(async () => {
            const result = await onReassign();
            router.refresh();
            if (result?.success) {
                toast.success(result?.message);
            }
        });
    };

    return (
        <Card className="mt-6 shadow-sm rounded-xl">
            <CardHeader>
                <CardTitle>Optimize Task Distribution</CardTitle>
            </CardHeader>

            <CardContent className="flex justify-between items-center">
                <p className="text-muted-foreground text-sm">
                    Balance tasks automatically across team members.
                </p>
                <Button onClick={handleClick} className="flex gap-1">
                    <Shuffle className="h-4 w-4" />
                    {isPending ? "Reassigning..." : "Reassign Tasks"}
                </Button>
            </CardContent>
        </Card>
    );
};

export default ReassignSection;
