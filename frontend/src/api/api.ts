import type { Idea } from "../types";

export const API_URL = import.meta.env.VITE_API_URL;

export async function fetchIdeas(): Promise<Idea[]> {
    const res = await fetch(`${API_URL}/ideas`);
    if (!res.ok) throw new Error("Failed to fetch ideas");
    return res.json();
}

export async function voteForIdea(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/ideas/${id}/vote`, {
        method: "POST",
    });

    if (!res.ok) throw new Error("Failed to vote");
}
