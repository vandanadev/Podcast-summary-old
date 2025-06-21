'use client';

import { getPodcastById } from '@/lib/podcast-api';
import { PodcastInfo } from '@/components/podcasts/PodcastInfo';
import { EpisodeCard } from '@/components/podcasts/EpisodeCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { useEffect, useState } from 'react';
import { PodcastDetails } from '@/types/podcast'
import Loading from '@/app/loading';


export default function PodcastPage({ params }: { params: Promise<{ id: string }> }) {
  try {

    const [podcast, setPodcast] = useState<PodcastDetails | null>()

    useEffect(() => {
      async function fetchPodcast() {
        const { id } = await params;
        try {
          const response = await fetch(`/api/podcasts/${id}`);
          const podcast = await response.json()
          setPodcast(podcast)
        }
        catch (error) {

        }
      }

      fetchPodcast()
    }, [params])

    if (!podcast) {
      return <Loading />
    }

    return (
      <div className="container mx-auto max-w-6xl py-4 sm:py-6 lg:py-8">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3 lg:gap-12">
          <div className="md:col-span-1">
            <PodcastInfo podcast={podcast} />
          </div>
          <div className="md:col-span-2">
            <Card className="dark:bg-zinc-900/50">
              <CardHeader className="pb-4">
                <CardTitle className='text-xl sm:text-2xl font-bold'>
                  All Episodes ({podcast.episodes.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3 sm:space-y-4">
                  {podcast.episodes.map((episode) => (
                    <EpisodeCard key={episode.id} episode={episode} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);

    return (
      <div className="container mx-auto py-4 sm:py-6 lg:py-8 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Error</h1>
        <p className="text-base sm:text-lg text-destructive px-4">
          Failed to fetch podcast details. Please try again later.
        </p>
      </div>
    );
  }
} 