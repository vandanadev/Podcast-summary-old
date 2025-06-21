import { getPodcastById } from "@/lib/podcast-api";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    {params}: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const podcast = await getPodcastById(id);

        return Response.json(podcast);
    } catch (error) {
        console.error("API Error:", error);

        return Response.json({ error: "Failed to fetch podcast" }, { status: 500 });
    }
} 