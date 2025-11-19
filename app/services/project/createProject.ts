/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { createProjectZodSchema } from "@/app/zod/project.validation";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidators } from "@/lib/zodValidators";


export const createProject = async (_currentState: any, formData: FormData): Promise<any> => {
    try {
        const payload = {
            name: formData.get('name'),
            linkedTeam: formData.get("linkedTeam")
        };

        if (zodValidators(payload, createProjectZodSchema).success === false) {
            return zodValidators(payload, createProjectZodSchema);
        }

        const validatedPayload = zodValidators(payload, createProjectZodSchema).data;

        const res = await serverFetch.post('/projects/create', {
            body: JSON.stringify(validatedPayload),
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include'
        });

        const result = await res.json();

        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: error.message || "Project creation failed!"
        }
    }

};