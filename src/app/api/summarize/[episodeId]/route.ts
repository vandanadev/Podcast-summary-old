import { connectToDB } from "@/lib/mongodb";
import { SummaryModel } from "@/models/Summary";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context : { params: { episodeId: string } }
) {
  try {
    const { episodeId } = await context.params;
    await connectToDB();
    const summaryDoc = await SummaryModel.findOne({ episodeId });

    if (!summaryDoc) {
      return Response.json({ found: false });
    }

    return Response.json({ found: true, summary: summaryDoc.summary });
  } catch (error) {
    console.error("DB Fetch Error:", error);
    return Response.json({ error: "Failed to fetch summary" }, { status: 500 });
  }
}
