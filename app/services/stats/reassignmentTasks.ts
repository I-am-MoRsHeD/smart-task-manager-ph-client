'use server';

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";


export const reassignmentTasksFunction = async () => {
    const res = await serverFetch.post('/reassignment', {
        next: {
            tags: ["PROJECT", "TEAM", "STATS"]
        },
    });

    const data = await res.json();

    if (data?.success) {
        revalidatePath("/user/dashboard");
    }
    return data;
};
