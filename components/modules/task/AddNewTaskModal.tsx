"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { IMember } from "@/types";
import { useActionState, useState } from "react";
import { priorityInfo, statusInfo } from "@/static/dropdownData";
import { addTask } from "@/app/services/task/createTask";

interface AddTaskModalProps {
    open: boolean;
    onClose: () => void;
    projectId: string;
    members: IMember[];
}

const AddNewTaskModal = ({ open, onClose, projectId, members }: AddTaskModalProps) => {
    const [selectedMember, setSelectedMember] = useState<IMember | null>(null);

    const [state, formAction, isPending] = useActionState(addTask, null);

    const capacityError = (() => {
        if (!selectedMember) return null;

        const isOverCapacity =
            selectedMember.currentTask > selectedMember.capacity;

        return isOverCapacity
            ? `${selectedMember.name} has ${selectedMember.currentTask} tasks but capacity is ${selectedMember.capacity}. Assign anyway?`
            : null;
    })();


    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-white overflow-y-scroll h-[90%]">
                <DialogHeader>
                    <DialogTitle>Add Task</DialogTitle>
                </DialogHeader>

                <form action={formAction}>
                    <input type="hidden" name="projectId" value={projectId} />
                    <FieldGroup className="space-y-3">

                        {/* Title */}
                        <Field>
                            <FieldLabel htmlFor="title">Title</FieldLabel>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Enter task title"
                            />
                            <InputFieldError field="title" state={state} />
                        </Field>

                        {/* Description */}
                        <Field>
                            <FieldLabel htmlFor="description">Description</FieldLabel>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Describe the task..."
                                rows={3}
                            />
                            <InputFieldError field="description" state={state} />
                        </Field>

                        {/* Select Assigned Member */}
                        <Field>
                            <FieldLabel>Assigned Member (Name - Role - Capacity)</FieldLabel>
                            <Select
                                onValueChange={(value) => {
                                    const member = members.find(m => String(m.member_no) === value);
                                    setSelectedMember(member || null);
                                }}
                                name="assignedMember"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select member" />
                                </SelectTrigger>
                                <SelectContent>
                                    {members.map((member) => (
                                        <SelectItem
                                            key={member.member_no}
                                            value={String(member.member_no)}
                                        >
                                            {member.name} — {member.role} - {member.capacity}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {capacityError && (
                                <p className="text-red-500 text-sm mt-1">{capacityError}</p>
                            )}
                        </Field>


                        {/* Priority */}
                        <Field>
                            <FieldLabel>Priority</FieldLabel>
                            <Select name="priority">
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        priorityInfo?.map(data => (
                                            <SelectItem key={data?.value} value={data?.value}>{data?.label}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </Field>

                        {/* Status */}
                        <Field>
                            <FieldLabel>Status</FieldLabel>
                            <Select name="status">
                                <SelectTrigger>
                                    <SelectValue placeholder="Task Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        statusInfo?.map(data => (
                                            <SelectItem key={data?.value} value={data?.value}>{data?.label}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </Field>

                        {/* Submit Buttons */}
                        <div className="flex justify-end gap-2 pt-4">
                            <Button variant="outline" type="button" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button disabled={isPending} type="submit">
                                {isPending ? "Adding..." : "Add Task"}
                            </Button>
                        </div>
                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddNewTaskModal;
