'use server';

import { serverFetch } from "@/lib/server-fetch";


export const getDashboardStats = async () => {
    const res = await serverFetch.get('/stats', {
        next: {
            tags: ["PROJECT", "TEAM"]
        }
    });

    const { data: stats } = await res.json();
    return stats;
};

