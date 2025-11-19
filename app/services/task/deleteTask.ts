/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath, revalidateTag } from "next/cache";


export const deleteTask = async (id: string) => {

    const res = await serverFetch.delete(`/tasks/${id}`, {
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include',
        next: {
            tags: ["PROJECT"]
        }
    });

    const result = await res.json();

    if (result?.success) {
        revalidateTag("PROJECT", "default");
        revalidatePath("/projects");
    };

    return result;
};
