'use server';

import { serverFetch } from "@/lib/server-fetch";

export const getRecentReassignments = async () => {
    const res = await serverFetch.get('/reassignment', {
        next: {
            tags: ["STATS"]
        }
    });

    const { data: logs } = await res.json();

    return logs;
};
