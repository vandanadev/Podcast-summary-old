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
import { getEpisodeById, getPodcastById } from '@/lib/podcast-api';
import { Episode, PodcastDetails } from '@/types/podcast';

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
                const podcastData = await getPodcastById(pathParts[1]);
                setPodcast(podcastData);
            } else if (pathParts[0] === 'episode' && pathParts[1]) {
                const episodeData = await getEpisodeById(pathParts[1]);
                setEpisode(episodeData);
                if (episodeData.podcast) {
                    const podcastData = await getPodcastById(episodeData.podcast.id);
                    setPodcast(podcastData);
                }
            }
        };

        fetchBreadcrumbData();
    }, [pathname]);

    const renderBreadcrumbs = () => {
        const pathParts = pathname.split('/').filter(Boolean);

        return (
            <Breadcrumb className="mb-4">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {pathParts.length > 0 && <BreadcrumbSeparator />}

                    {podcast && pathParts[0] === 'podcasts' && (
                        <BreadcrumbItem>
                            <BreadcrumbPage>{podcast.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    )}

                    {podcast && episode && pathParts[0] === 'episode' && (
                        <>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={`/podcasts/${podcast.id}`}>{podcast.title}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{episode.title}</BreadcrumbPage>
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

    return <div className="container mx-auto py-4">{renderBreadcrumbs()}</div>;
};

export default Breadcrumbs; 