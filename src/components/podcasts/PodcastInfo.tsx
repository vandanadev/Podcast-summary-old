import Image from "next/image";
import { Card, CardContent } from "@/registry/new-york-v4/ui/card";
import { PodcastDetails } from "@/types/podcast";

export function PodcastInfo({ podcast }: { podcast: PodcastDetails }) {
	return (
		<div className="md:sticky md:top-8">
			<Card className="overflow-hidden rounded-lg shadow-lg dark:bg-zinc-900">
				<CardContent className="p-0">
					<div className="aspect-square w-full relative">
						<Image
							src={podcast.thumbnail}
							alt={`${podcast.title} cover art`}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
							className="object-cover"
							priority
						/>
					</div>
					<div className="p-4 sm:p-6">
						<h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">{podcast.title}</h1>
						<p className="text-sm sm:text-base text-muted-foreground mt-2">
							By {podcast.publisher}
						</p>
						<div
							className="prose prose-sm sm:prose-base dark:prose-invert mt-3 sm:mt-4 max-h-48 sm:max-h-60 overflow-y-auto"
							dangerouslySetInnerHTML={{ __html: podcast.description }}
						/>
					</div>
				</CardContent>
			</Card>
		</div>
	);
} 