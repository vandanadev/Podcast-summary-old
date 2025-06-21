import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, } from "@/registry/new-york-v4/ui/card";
import { Podcast } from "@/types/podcast";
import { Badge } from "@/registry/new-york-v4/ui/badge";


export function PodcastCard({ podcast }: { podcast: Podcast }) {
	return (
		<Link
			href={`/podcasts/${podcast.id}`}
			className="block group transform transition-transform duration-300 ease-in-out hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
		>
			<Card className="h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out dark:bg-zinc-900">
				<CardHeader className="p-0">
					<div className="aspect-square w-full relative">
						<Image
							src={podcast.thumbnail}
							alt={`${podcast.title} cover art`}
							fill
							sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
							className="object-cover"
							priority
						/>
					</div>
				</CardHeader>
				<CardContent className="p-3 sm:p-4">
					<CardTitle className="text-sm sm:text-base lg:text-lg font-semibold leading-tight mb-2 line-clamp-2">
						{podcast.title}
					</CardTitle>
					<p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3 line-clamp-1">
						By {podcast.publisher}
					</p>
					<Badge variant="secondary" className="text-xs">{podcast.country}</Badge>
				</CardContent>
			</Card>
		</Link>
	);
}