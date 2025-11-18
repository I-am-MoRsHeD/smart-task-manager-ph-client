/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { loginValidateZodSchema } from "@/app/zod/auth.validation";
import { serverFetch } from "@/lib/server-fetch";
import { parse } from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import { setCookie } from "./tokenHandlers";
import { zodValidators } from "@/lib/zodValidators";


export const loginUser = async (_currentState: any, formData: any): Promise<any> => {
    try {
        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;

        const payload = {
            email: formData.get('email'),
            password: formData.get("password"),
        };

        if (zodValidators(payload, loginValidateZodSchema).success === false) {
            return zodValidators(payload, loginValidateZodSchema);
        }

        const validatedPayload = zodValidators(payload, loginValidateZodSchema).data;


        const res = await serverFetch.post('/auth/login', {
            body: JSON.stringify(validatedPayload),
            headers: {
                'content-type': 'application/json'
            }
        });

        const result = await res.json();

        if (!result.success) {
            throw new Error(result.message || "Login failed");
        }

        const setCookiesHeaders = res.headers.getSetCookie();

        if (setCookiesHeaders && setCookiesHeaders.length > 0) {
            setCookiesHeaders.forEach((cookie) => {
                const parsedCookie = parse(cookie);

                if (parsedCookie['accessToken']) {
                    accessTokenObject = parsedCookie;
                };
                if (parsedCookie['refreshToken']) {
                    refreshTokenObject = parsedCookie;
                };
            })
        } else {
            throw new Error("No set-cookie headers found");
        };

        if (!accessTokenObject && !refreshTokenObject) {
            throw new Error("Tokens are missing in cookies");
        };

        await setCookie('accessToken', accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60,
            path: accessTokenObject.Path,
            sameSite: accessTokenObject.SameSite || "none"
        });
        await setCookie('refreshToken', refreshTokenObject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
            path: refreshTokenObject.Path,
            sameSite: refreshTokenObject.SameSite || "none"
        });

        const verifiedUser: JwtPayload | string = jwt.verify(accessTokenObject.accessToken, process.env.JWT_ACCESS_SECRET as string);

        if (verifiedUser && typeof verifiedUser === "string") {
            throw new Error("Invalid token payload");
        };

        return {
            success: true,
            message: result.message
        }


    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }
        console.log(error);
        return {
            success: false,
            message: error.message || "Login failed! Wrong credentials."
        }
    }
};

