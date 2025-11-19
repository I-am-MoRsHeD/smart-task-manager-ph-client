import z from "zod";



export const createProjectZodSchema = z.object({
    name: z.string().min(1, "Project name is required"),

    linkedTeam: z.string({ error: 'Select a team' }).min(1, "Select a team")
});
