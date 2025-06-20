import Image from "next/image";
import { Card, CardContent } from "@/registry/new-york-v4/ui/card";
import { PodcastDetails } from "@/types/podcast";


export function PodcastInfo({ podcast }: { podcast: PodcastDetails }) {
	return (
		<Card>
			<CardContent className="pt-6">
				<div className="relative w-full h-64 mx-auto">
					<Image
						src={podcast.thumbnail}
						alt={podcast.title}
						fill
						sizes="(max-width: 768px) 100vw, 33vw"
						className="object-cover rounded-lg"
					/>
				</div>
				<h1 className="text-2xl font-bold mt-4">{podcast.title}</h1>
				<p className="text-sm text-muted-foreground mt-2">
					By {podcast.publisher}
				</p>
				<div
					className="text-sm mt-4"
					dangerouslySetInnerHTML={{ __html: podcast.description }}
				/>
			</CardContent>
		</Card>
	);
} 