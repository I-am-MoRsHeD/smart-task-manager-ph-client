/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { updateTaskZodSchema } from "@/app/zod/task.validation";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidators } from "@/lib/zodValidators";
import { revalidatePath, revalidateTag } from "next/cache";



export const updateTask = async (_currentState: any, formData: FormData): Promise<any> => {
    try {
        const taskId = formData.get('taskId');
        const payload = {
            title: formData.get("title"),
            description: formData.get("description"),
            assignedMember: Number(formData.get("assignedMember")),
            priority: formData.get("priority"),
            status: formData.get("status"),
        };

        if (zodValidators(payload, updateTaskZodSchema).success === false) {
            return zodValidators(payload, updateTaskZodSchema);
        }

        const validatedPayload = zodValidators(payload, updateTaskZodSchema).data;

        const res = await serverFetch.patch(`/tasks/${taskId}`, {
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
            message: error.message || "Task updated failed!"
        }
    }

};

