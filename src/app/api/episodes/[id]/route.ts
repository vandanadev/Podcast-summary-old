import { getEpisodeById } from "@/lib/podcast-api";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const episode = await getEpisodeById(id);

        return Response.json(episode);
    } catch (error) {
        console.error("API Error:", error);
        
        return Response.json({ error: "Failed to fetch episode" }, { status: 500 });
    }
} 