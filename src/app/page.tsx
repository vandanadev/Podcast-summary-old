import { getBestPodcasts } from '@/lib/podcast-api';

import { PodcastCard } from '@/components/podcasts/PodcastCard';
import { Pagination } from '@/components/ui/pagination';

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  try {
    const params = await searchParams;
    const currentPage = Number(params?.page) || 1;
    const { podcasts, total } = await getBestPodcasts(currentPage);

    const totalPages = Math.ceil(total / 10);

    return (
      <div className='container mx-auto py-4 sm:py-6 lg:py-8'>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8'>Top Podcasts</h1>
        <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6'>
          {podcasts.map((podcast) => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
        <div className='mt-6 sm:mt-8'>
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="container mx-auto py-4 sm:py-6 lg:py-8 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Error</h1>
        <p className="text-base sm:text-lg text-destructive px-4">
          Failed to fetch podcasts. Please try again later.
        </p>
      </div>
    );
  }
}
