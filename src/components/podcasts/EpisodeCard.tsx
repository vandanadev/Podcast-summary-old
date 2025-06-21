import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/registry/new-york-v4/ui/card";
import { Episode } from "@/types/podcast";
import { formatDate, formatDuration } from "@/lib/utils";
import { PlayCircle } from "lucide-react";

export function EpisodeCard({ episode }: { episode: Episode }) {
	return (
		<Link href={`/episode/${episode.id}`} className="block group focus:outline-none focus:ring-2 focus:ring-primary rounded-lg">
			<Card className="transition-colors duration-300 group-hover:bg-muted/50 dark:group-hover:bg-zinc-800/80">
				<CardContent className="p-3 sm:p-4">
					<div className="flex items-start gap-3 sm:gap-4">
						<div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
							<Image
								src={episode.thumbnail}
								alt={episode.title}
								fill
								sizes="(max-width: 640px) 64px, 80px"
								className="object-cover rounded-md"
							/>
						</div>
						<div className="flex-grow min-w-0">
							<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-2">
								<p className="text-xs text-muted-foreground">
									{formatDate(episode.pub_date_ms)}
								</p>
								<p className="text-xs text-muted-foreground">
									{formatDuration(episode.audio_length_sec)}
								</p>
							</div>
							<h3 className="text-sm sm:text-base font-semibold mt-1 sm:mt-2 group-hover:text-primary transition-colors line-clamp-2">
								{episode.title}
							</h3>
							<div
								className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2 line-clamp-2"
								dangerouslySetInnerHTML={{ __html: episode.description }}
							/>
						</div>
						<div className="self-center pl-2 flex-shrink-0">
							<PlayCircle className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground group-hover:text-primary transition-colors" />
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
} 