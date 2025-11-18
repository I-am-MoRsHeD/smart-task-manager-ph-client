/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { registerPatientValidateZodSchema } from "@/app/zod/auth.validation";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidators } from "@/lib/zodValidators";
import { loginUser } from "./loginUser";


export const registerUser = async (_currentState: any, formData: any): Promise<any> => {
    try {

        const payload = {
            name: formData.get("name"),
            email: formData.get('email'),
            password: formData.get("password"),
        };

        if (zodValidators(payload, registerPatientValidateZodSchema).success === false) {
            return zodValidators(payload, registerPatientValidateZodSchema);
        }

        const validatedPayload = zodValidators(payload, registerPatientValidateZodSchema).data;


        const res = await serverFetch.post('/auth/register', {
            body: JSON.stringify(validatedPayload),
            headers: {
                'content-type': 'application/json'
            }
        });

        const result = await res.json();

        if (result.success) {
            await loginUser(_currentState, formData);
        }

    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }
        console.log(error);
        return {
            success: false,
            message: error.message || "Registration failed!"
        }
    }
};

