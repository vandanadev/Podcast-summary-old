import { Client } from 'podcast-api';
import { BestPodcastsResponse, PodcastDetails, Episode } from '@/types/podcast';


export type { Podcast, BestPodcastsResponse, Episode, PodcastDetails } from '@/types/podcast';


const client = Client({ apiKey: process.env.PODCAST_API_KEY || null });

// async function fetchWithRetry<T>(apiCall: () => Promise<T>, retries = 3): Promise<T> {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await apiCall();
//     } catch (error) {
//       console.error(`Attempt ${i + 1} failed:`, error);
//       if (i === retries - 1) {
//         throw new Error(`API call failed after ${retries} attempts`);
//       }
//     }
//   }
//   throw new Error('Should not be reached');
// }

export async function getBestPodcasts(page = 1, sort: 'listen_score' | 'recent' = 'listen_score'): Promise<BestPodcastsResponse> {

    const response = await client.fetchBestPodcasts({
      page,
      sort,
    });

    return response.data;
}

export async function getPodcastById(id: string, sort: 'recent_first' | 'oldest_first' = 'recent_first'): Promise<PodcastDetails> {

    const response = await client.fetchPodcastById({
      id,
      sort,
    });

    return response.data;

}

export async function getEpisodeById(id: string): Promise<Episode> {

    const response = await client.fetchEpisodeById({
      id,
    });
    
    return response.data;

} 

