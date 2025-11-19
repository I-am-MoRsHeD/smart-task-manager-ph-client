'use server';

import { serverFetch } from "@/lib/server-fetch";

export const getProjectById = async (id : string) => {
    const res = await serverFetch.get(`/projects/${id}`, {
        next: {
            tags: ["PROJECT"]
        }
    });

    const { data: projects } = await res.json();
    return projects;
};
