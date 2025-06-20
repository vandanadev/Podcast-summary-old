import Image from "next/image";
import Link from "next/link";
import { Button } from "@/registry/new-york-v4/ui/button";
import { Card, CardContent } from "@/registry/new-york-v4/ui/card";
import { Episode } from "@/types/podcast";


export function EpisodeCard({ episode }: { episode: Episode }) {
	return (
		<Card>
			<CardContent className="pt-6">
				<div className="flex gap-4">
					<div className="relative w-24 h-24 flex-shrink-0">
						<Image
							src={episode.thumbnail}
							alt={episode.title}
							fill
							sizes="96px"
							className="object-cover rounded-lg"
						/>
					</div>
					<div>
						<h3 className="text-lg font-semibold">{episode.title}</h3>
						<div
							className="text-sm text-muted-foreground mt-2"
							dangerouslySetInnerHTML={{ __html: episode.description }}
						/>
						<Link href={`/episode/${episode.id}`}>
							<Button className="mt-4" >Get Summary</Button>
						</Link>

					</div>
				</div>
			</CardContent>
		</Card>
	);
} 