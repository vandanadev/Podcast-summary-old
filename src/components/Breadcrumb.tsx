'use client'

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/registry/new-york-v4/ui/breadcrumb';
import { useEffect, useState } from 'react';
import { Episode, PodcastDetails } from '@/types/podcast';
import { getEpisodeByIdClient, getPodcastByIdClient } from '@/lib/client-podcast-api';

const Breadcrumbs = () => {
    const pathname = usePathname();
    const [podcast, setPodcast] = useState<PodcastDetails | null>(null);
    const [episode, setEpisode] = useState<Episode | null>(null);

    useEffect(() => {
        const fetchBreadcrumbData = async () => {
            setPodcast(null);
            setEpisode(null);
            const pathParts = pathname.split('/').filter(Boolean);

            if (pathParts[0] === 'podcasts' && pathParts[1]) {
                const podcastData = await getPodcastByIdClient(pathParts[1]);
                setPodcast(podcastData);
            } else if (pathParts[0] === 'episode' && pathParts[1]) {
                const episodeData = await getEpisodeByIdClient(pathParts[1]);
                setEpisode(episodeData);
                if (episodeData.podcast) {
                    const podcastData = await getPodcastByIdClient(episodeData.podcast.id);
                    setPodcast(podcastData);
                }
            }
        };

        fetchBreadcrumbData();
    }, [pathname]);

    const renderBreadcrumbs = () => {
        const pathParts = pathname.split('/').filter(Boolean);

        return (
            <Breadcrumb className="mb-3 sm:mb-4">
                <BreadcrumbList className="text-sm sm:text-base">
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {pathParts.length > 0 && <BreadcrumbSeparator />}

                    {podcast && pathParts[0] === 'podcasts' && (
                        <BreadcrumbItem>
                            <BreadcrumbPage className="line-clamp-1 max-w-[200px] sm:max-w-none">{podcast.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    )}

                    {podcast && episode && pathParts[0] === 'episode' && (
                        <>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={`/podcasts/${podcast.id}`} className="hover:text-primary transition-colors line-clamp-1 max-w-[150px] sm:max-w-none">{podcast.title}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="line-clamp-1 max-w-[200px] sm:max-w-none">{episode.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </>
                    )}
                </BreadcrumbList>
            </Breadcrumb>
        );
    };

    if (pathname === '/') {
        return null;
    }

    return <div className="container mx-auto py-2 sm:py-4 px-4 sm:px-6 lg:px-8">{renderBreadcrumbs()}</div>;
};

export default Breadcrumbs; 