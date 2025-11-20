import { TaskPriority, TaskStatus } from "@/types";
import z from "zod";


export const addTaskZodSchema = z.object({
    title: z.string().min(1, {
        error: "Title must be 1 characters long"
    }),
    description: z.string().min(1, {
        error: "Description must be 1 characters long"
    }),
    assignedMember: z.number(),
    priority: z.enum(TaskPriority),
    status: z.enum(TaskStatus),

    projectId: z.string()
});

export const updateTaskZodSchema = z.object({
    title: z.string().min(1, {
        error: "Title must be 1 characters long"
    }).optional(),
    description: z.string().min(1, {
        error: "Description must be 1 characters long"
    }).optional(),
    assignedMember: z.number().optional(),
    priority: z.enum(TaskPriority).optional(),
    status: z.enum(TaskStatus).optional(),
});
