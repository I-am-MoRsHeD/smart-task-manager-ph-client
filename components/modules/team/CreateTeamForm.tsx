'use client';
import { createTeam } from "@/app/services/team/createTeam";
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { PlusCircle, Trash2 } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

const CreateTeamForm = () => {
    const [state, formAction, isPending] = useActionState(createTeam, null);
    const [members, setMembers] = useState([
        { name: "", role: "", capacity: "" }
    ]);

    const handleAddMember = () => {
        setMembers([
            ...members,
            { name: "", role: "", capacity: "" }
        ]);
    };

    const handleRemoveMember = (index: number) => {
        if (members.length === 1) return;

        const updated = members.filter((_, i) => i !== index);
        setMembers(updated);
    };

    const handleChange = (index: number, field: keyof typeof members[number], value: string) => {
        const updated = [...members];
        updated[index][field] = value;
        setMembers(updated);
    };

    useEffect(() => {
        if (state && state?.success) {
            toast.success(state?.message || "Team created successfully!");
        }
    }, [state]);

    return (
        <form action={formAction} className="w-[90%] mx-auto">
            <FieldGroup>
                <div className="grid grid-cols-1 gap-4">
                    {/* name */}
                    <Field>
                        <FieldLabel htmlFor="name">
                            Team Name
                        </FieldLabel>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Bloody Warriors"
                        />
                        <InputFieldError field="name" state={state} />
                    </Field>
                    {/* Members Section */}
                    <div className="mt-6">
                        <h3 className="font-semibold mb-2">Add Members:</h3>

                        {members.map((member, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-12 gap-2 mb-2 items-center"
                            >
                                {/* Name */}
                                <div className="col-span-5">
                                    <Input
                                        name={`members[${index}].name`}
                                        placeholder="Name"
                                        value={member.name}
                                        onChange={(e) =>
                                            handleChange(index, "name", e.target.value)
                                        }
                                    />
                                    <InputFieldError field={`members.${index}.name`} state={state} />
                                </div>

                                {/* Role */}
                                <div className="col-span-3">
                                    <Input
                                        name={`members[${index}].role`}
                                        placeholder="Role"
                                        value={member.role}
                                        onChange={(e) =>
                                            handleChange(index, "role", e.target.value)
                                        }
                                    />
                                    <InputFieldError field={`members.${index}.role`} state={state} />

                                </div>

                                {/* Capacity */}
                                <div className="col-span-3">
                                    <Input
                                        name={`members[${index}].capacity`}
                                        type="number"
                                        placeholder="Capacity"
                                        value={member.capacity}
                                        onChange={(e) =>
                                            handleChange(index, "capacity", e.target.value)
                                        }
                                    />
                                    <InputFieldError field={`members.${index}.capacity`} state={state} />

                                </div>

                                {/* Delete button - hide if only one */}
                                <div className="col-span-1 flex justify-center">
                                    {members.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            onClick={() => handleRemoveMember(index)}
                                        >
                                            <Trash2 />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Add button */}
                        <Button
                            type="button"
                            variant="secondary"
                            className="mt-2"
                            onClick={handleAddMember}
                        >
                            <PlusCircle /> Add
                        </Button>
                    </div>
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

export default CreateTeamForm;