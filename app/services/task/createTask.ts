/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { addTaskZodSchema } from "@/app/zod/task.validation";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidators } from "@/lib/zodValidators";
import { revalidatePath, revalidateTag } from "next/cache";



export const addTask = async (_currentState: any, formData: FormData): Promise<any> => {
    try {
        const payload = {
            title: formData.get("title"),
            description: formData.get("description"),
            assignedMember: Number(formData.get("assignedMember")),
            priority: formData.get("priority"),
            status: formData.get("status"),
            projectId: formData.get('projectId')
        };

        if (zodValidators(payload, addTaskZodSchema).success === false) {
            return zodValidators(payload, addTaskZodSchema);
        }

        const validatedPayload = zodValidators(payload, addTaskZodSchema).data;

        const res = await serverFetch.post('/tasks/create', {
            body: JSON.stringify(validatedPayload),
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
            next: {
                tags: ["PROJECT"]
            }
        });

        const result = await res.json();

        if (result.success) {
            revalidateTag("PROJECT", "default");
            revalidatePath('/user/create-project')
        }

        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: error.message || "Project creation failed!"
        }
    }

};

