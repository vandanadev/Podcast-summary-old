'use client'

import { use, useEffect, useState } from 'react';
import { getEpisodeById } from "@/lib/podcast-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card";
import Loading from '@/app/loading';
import { Episode } from '@/types/podcast';
import Image from 'next/image';

export default function EpisodePage({ params }: { params: Promise<{ id: string }> }) {
	const [summary, setSummary] = useState<string | null>(null);
	const [episode, setEpisode] = useState<Episode | null>(null);
	const [loading, setLoading] = useState(true);

	const { id } = use(params);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const episodeData = await getEpisodeById(id);
				setEpisode(episodeData);

				const summaryRes = await fetch(`/api/summarize/${id}`);
				const summaryData = await summaryRes.json();

				if (summaryData.found) {
					setSummary(summaryData.summary);
				} else {
					const response = await fetch("/api/summarize", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							audioUrl: episodeData?.audio,
							description: episodeData?.description,
							episodeId: id
						}),
					});

					const data = await response.json();
					if (response.ok) {
						setSummary(data.saved.summary);
					} else {
						console.error("Failed to summarize", data.error);
					}
				}
			} catch (err) {
				console.error("Request error", err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [id]);

	if (loading) {
		return <Loading />;
	}


	return (
		<div className="container mx-auto p-4 space-y-8">
			{summary && (
				<Card>
					<CardHeader>
						<CardTitle>Episode Summary</CardTitle>
					</CardHeader>
					<CardContent>
						<p>{summary}</p>
					</CardContent>
				</Card>
			)}

			{episode && (
				<Card>
					<CardHeader>
						<CardTitle>{episode.title}</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="mx-auto justify-items-center">
							<Image
								src={episode.image}
								alt={episode.title}
								width={0} // width 0 enables auto layout
								height={0}
								sizes="30vw"
								className="h-auto w-auto object-cover rounded-lg"
							/>
						</div>
						<audio controls src={episode.audio} className="w-full">
							Your browser does not support the audio element.
						</audio>
						<div
							className="text-sm prose"
							dangerouslySetInnerHTML={{ __html: episode.description }}
						/>
						<div className="text-xs text-muted-foreground">
							<span>
								Published on: {new Date(episode.pub_date_ms).toLocaleDateString()}
							</span>
							{' | '}
							<span>
								Duration: {Math.floor(episode.audio_length_sec / 60)} minutes
							</span>
						</div>
					</CardContent>
				</Card>
			)}

			{!loading && !summary && !episode && (
				<p>Could not load episode data.</p>
			)}
		</div>
	);
}
