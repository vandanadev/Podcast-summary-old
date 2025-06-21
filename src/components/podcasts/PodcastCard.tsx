import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, } from "@/registry/new-york-v4/ui/card";
import { Podcast } from "@/types/podcast";
import { Badge } from "@/registry/new-york-v4/ui/badge";


export function PodcastCard({ podcast }: { podcast: Podcast }) {
	return (
		<Link href={`/podcasts/${podcast.id}`} className="block transform transition-transform duration-200 hover:scale-105">
			<Card className="h-full">
				<CardHeader>
					<div className="relative w-full h-48 mb-4">
						<Image
							src={podcast.thumbnail}
							alt={podcast.title}
							fill
							sizes="(max-width: 640px) 100vw, 50vw"
							className="object-cover rounded-t-lg"
						/>
					</div>
					<CardTitle>{podcast.title}</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground mb-2">
						By {podcast.publisher}
					</p>
					<Badge variant="secondary">{podcast.country}</Badge>
				</CardContent>
			</Card>
		</Link>
	);
}