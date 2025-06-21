import { Episode, PodcastDetails } from "@/types/podcast";

export async function getPodcastByIdClient(id: string): Promise<PodcastDetails> {
    const response = await fetch(`/api/podcasts/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch podcast');
    }
    return response.json();
}

export async function getEpisodeByIdClient(id: string): Promise<Episode> {
    const response = await fetch(`/api/episodes/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch episode');
    }
    return response.json();
} 