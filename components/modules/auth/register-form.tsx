/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { registerUser } from "@/app/services/auth/registerUser";
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { useActionState } from "react";


const RegisterForm = () => {
    const [state, formAction, isPending] = useActionState(registerUser, null);

    return (
        <form action={formAction}>
            <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* name */}
                    <Field>
                        <FieldLabel htmlFor="name">
                            Name
                        </FieldLabel>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Evil Rabbit"
                        />
                        <InputFieldError field="name" state={state} />
                    </Field>
                    {/* email */}
                    <Field>
                        <FieldLabel htmlFor="email">
                            Email
                        </FieldLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="evil@gmail.com"
                        />
                        <InputFieldError field="email" state={state} />
                    </Field>
                    {/* Password */}
                    <Field>
                        <FieldLabel htmlFor="password">
                            Password
                        </FieldLabel>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="********"
                        />
                        <InputFieldError field="password" state={state} />
                    </Field>
                </div>
                <FieldGroup>
                    <Field>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Creating account..." : "Create Account"}
                        </Button>
                        <FieldDescription className="px-6 text-center">
                            Already have an account? {" "}
                            <Link href="/login" className="text-blue-600 hover:underline">
                                Sign in
                            </Link>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </form>
    );
};

export default RegisterForm;