'use client'

import { use, useEffect, useState } from 'react';
import { getEpisodeById } from "@/lib/podcast-api";
import { Card, CardContent } from "@/registry/new-york-v4/ui/card";
import Loading from '@/app/loading';

export default function EpisodePage({ params }: { params: Promise<{ id: string }> }) {
	const [summary, setSummary] = useState<string | null>(null);

	const { id } = use(params);

	useEffect(() => {
		const fetchData = async () => {
			try {

				const episodeData = await getEpisodeById(id);

				const summaryRes = await fetch(`/api/summarize/${id}`);
				const summaryData = await summaryRes.json();

				if (summaryData.found) {
					setSummary(summaryData.summary);
					return;
				}
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
				console.log(data)
				if (response.ok) {
					console.log("Summary:", data.saved.summary);
					setSummary(data.saved.summary);
				} else {
					console.error("Failed to summarize", data.error);
				}
			} catch (err) {
				console.error("Request error", err);
			}
		};

		fetchData();
	}, [id]);

	return (
		<div className="container mx-auto p-4">
			<Card>
				<CardContent className="pt-6">
					{!summary ? <Loading /> :
						(<div className="mt-4">
							<h2 className="text-xl font-semibold">Summary</h2>
							<p>{summary}</p>
						</div>
						)}
				</CardContent>
			</Card>
		</div>
	);
}
