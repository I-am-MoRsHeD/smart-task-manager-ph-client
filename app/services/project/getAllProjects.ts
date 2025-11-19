'use server';

import { serverFetch } from "@/lib/server-fetch";

export const getAllProjects = async () => {
    const res = await serverFetch.get('/projects', {
        next: {
            tags: ["PROJECT"]
        }
    });

    const { data: projects } = await res.json();
    return projects;
};
