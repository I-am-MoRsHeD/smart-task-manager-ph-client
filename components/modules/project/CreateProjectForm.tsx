'use client';
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input"
import { useActionState, useEffect } from "react";
import { ITeam } from "@/types";
import { createProject } from "@/app/services/project/createProject";
import { toast } from "sonner";

const CreateProjectForm = ({ teams }: { teams: ITeam[] }) => {
    const [state, formAction, isPending] = useActionState(createProject, null);

    useEffect(() => {
        if (!state || state?.error) {
            return;
        } else if (state && state?.success) {
            toast.success(state?.message || "Project created successfully!");
        } else {
            toast.error(state?.message);
        }
    }, [state]);

    return (
        <form action={formAction} className="w-[90%] mx-auto my-10">
            <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* name */}
                    <Field>
                        <FieldLabel htmlFor="name">
                            Project Name
                        </FieldLabel>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="The First Blood"
                        />
                        <InputFieldError field="name" state={state} />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="linkedTeam">
                            Select Team
                        </FieldLabel>
                        <Select
                            disabled={isPending}
                            name="linkedTeam"
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select team" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    teams?.length > 0 ? (
                                        teams?.map((team) => (
                                            <SelectItem key={team?._id} value={team?._id}>
                                                {team?.name}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem value="No" disabled>
                                            There is no team
                                        </SelectItem>
                                    )
                                }
                            </SelectContent>
                        </Select>
                        <InputFieldError field="linkedTeam" state={state} />
                    </Field>

                </div>
                <FieldGroup>
                    <Field>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Creating team...." : "Create Team"}
                        </Button>
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </form>
    );
};

export default CreateProjectForm;