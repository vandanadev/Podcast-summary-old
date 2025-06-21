import { getPodcastById } from '@/lib/podcast-api';
import { PodcastInfo } from '@/components/podcasts/PodcastInfo';
import { EpisodeCard } from '@/components/podcasts/EpisodeCard';
import Link from 'next/link';


export default async function PodcastPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const podcast = await getPodcastById(id);

    return (
      <div className="container mx-auto py-8">
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <PodcastInfo podcast={podcast} />
          </div>
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Episodes</h2>
            <div className="space-y-4">
              {podcast.episodes.map((episode) => (
                <EpisodeCard key={episode.id} episode={episode} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p className="text-lg text-destructive">
          Failed to fetch podcast details. Please try again later.
        </p>
      </div>
    );
  }
} 