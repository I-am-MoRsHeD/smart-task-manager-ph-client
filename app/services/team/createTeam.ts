/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { createTeamZodSchema } from "@/app/zod/team.validation";
import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath, revalidateTag } from "next/cache";

export const createTeam = async (_currentState: any, formData: FormData): Promise<any> => {

    try {
        const name = formData.get("name");

        const members: any[] = [];

        formData.forEach((value, key) => {
            if (key.startsWith("members")) {
                const match = key.match(/members\[(\d+)\]\.(\w+)/);

                if (match) {
                    const index = Number(match[1]);
                    const field = match[2];

                    if (!members[index]) members[index] = {};

                    if (field === "capacity") {
                        members[index][field] = Number(value);
                    } else {
                        members[index][field] = value;
                    }

                    members[index]["member_no"] = index + 1;
                }
            }
        });

        const payload = {
            name,
            members: members
        };

        const validatedPayload = createTeamZodSchema.safeParse(payload);

        if (!validatedPayload.success) {
            return {
                success: false,
                error: validatedPayload.error.issues.map(issue => {
                    return {
                        field: issue.path.join("."),
                        message: issue.message
                    };
                })
            };
        };

        const res = await serverFetch.post('/teams/create', {
            body: JSON.stringify(validatedPayload.data),
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
            next: {
                tags: ["TEAM"]
            }
        });

        const result = await res.json();

        if (result.success) {
            revalidateTag("TEAM", "default");
            revalidatePath('/user/team-list')
        };

        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: error.message || "Team creation failed!"
        }
    }

};
