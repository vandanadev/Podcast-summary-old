'use client'

import { use, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card";
import Loading from '@/app/loading';
import { Episode } from '@/types/podcast';
import Image from 'next/image';
import { getEpisodeByIdClient } from '@/lib/client-podcast-api';
import { formatDate, formatDuration } from '@/lib/utils';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Sparkles } from 'lucide-react';

export default function EpisodePage({ params }: { params: Promise<{ id: string }> }) {
	const [summary, setSummary] = useState<string | null>(null);
	const [episode, setEpisode] = useState<Episode | null>(null);
	const [loading, setLoading] = useState(true);
	const [isSummarizing, setIsSummarizing] = useState(false);

	const { id } = use(params);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const episodeData = await getEpisodeByIdClient(id);
				setEpisode(episodeData);

				if (!episodeData) {
					setLoading(false);
					return;
				}

				// Check for existing summary without triggering a new one
				const summaryRes = await fetch(`/api/summarize/${id}`);
				const summaryData = await summaryRes.json();

				if (summaryData.found) {
					setSummary(summaryData.summary);
				}
			} catch (err) {
				console.error("Request error", err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [id]);

	const handleSummarize = async () => {
		if (!episode) return;
		setIsSummarizing(true);
		try {
			const response = await fetch("/api/summarize", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					audioUrl: episode?.audio,
					description: episode?.description,
					episodeId: id
				}),
			});

			const data = await response.json();
			if (response.ok) {
				setSummary(data.saved.summary);
			} else {
				console.error("Failed to summarize", data.error);
				// TODO: Show an error to the user
			}
		} catch (error) {
			console.error("Summarization request failed", error);
			// TODO: Show an error to the user
		} finally {
			setIsSummarizing(false);
		}
	};

	if (loading) {
		return <Loading />;
	}

	if (!episode) {
		return (
			<div className="container mx-auto py-4 sm:py-6 lg:py-8 text-center">
				<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Episode not found</h1>
				<p className="text-base sm:text-lg text-muted-foreground px-4">
					We couldn't load the episode details. Please try again later.
				</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto max-w-6xl py-4 sm:py-6 lg:py-8">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
				<div className="md:col-span-1 md:sticky md:top-8 self-start space-y-6 sm:space-y-8">
					<Card className="dark:bg-zinc-900">
						<CardHeader className='pb-3 sm:pb-4'>
							<div className="aspect-square w-full relative mb-3 sm:mb-4">
								<Image
									src={episode.image}
									alt={episode.title}
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
									className="rounded-lg object-cover"
									priority
								/>
							</div>
							<CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight">{episode.title}</CardTitle>
							<div className="text-xs sm:text-sm text-muted-foreground pt-2 flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-2">
								<span>{formatDate(episode.pub_date_ms)}</span>
								<span>{formatDuration(episode.audio_length_sec)}</span>
							</div>
						</CardHeader>
						<CardContent className="pt-0">
							<audio controls src={episode.audio} className="w-full">
								Your browser does not support the audio element.
							</audio>
						</CardContent>
					</Card>
				</div>

				<div className="md:col-span-2 space-y-6 sm:space-y-8">
					{summary ? (
						<Card className="dark:bg-zinc-900/50">
							<CardHeader>
								<CardTitle className="text-xl sm:text-2xl font-bold">Summary</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
									{summary}
								</div>
							</CardContent>
						</Card>
					) : (
						<Card className="dark:bg-zinc-900/50">
							<CardHeader>
								<CardTitle className="text-xl sm:text-2xl font-bold">Generate Summary</CardTitle>
							</CardHeader>
							<CardContent className='flex flex-col items-center justify-center text-center p-6 sm:p-8'>
								<p className='mb-4 text-sm sm:text-base text-muted-foreground'>
									Click the button to generate an AI-powered summary for this episode.
								</p>
								<Button onClick={handleSummarize} disabled={isSummarizing} className="w-full sm:w-auto">
									{isSummarizing ? (
										'Summarizing...'
									) : (
										<>
											<Sparkles className="mr-2 h-4 w-4" />
											Summarize Episode
										</>
									)}
								</Button>
							</CardContent>
						</Card>
					)}
					<Card className="dark:bg-zinc-900/50">
						<CardHeader>
							<CardTitle className="text-xl sm:text-2xl font-bold">Description</CardTitle>
						</CardHeader>
						<CardContent>
							<div
								className="prose prose-sm sm:prose-base dark:prose-invert max-w-none"
								dangerouslySetInnerHTML={{ __html: episode.description }}
							/>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
