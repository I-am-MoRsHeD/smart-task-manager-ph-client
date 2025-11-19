'use server';

import { serverFetch } from "@/lib/server-fetch";

export const getAllTeams = async () => {
    const res = await serverFetch.get('/teams', {
        next: {
            tags: ["TEAM"]
        }
    });

    const { data: teams } = await res.json();
    return teams;
};
