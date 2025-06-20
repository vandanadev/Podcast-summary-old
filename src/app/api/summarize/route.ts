import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectToDB } from "@/lib/mongodb";
import { SummaryModel } from "@/models/Summary";

export async function POST(request: Request) {
  const { audioUrl, description, episodeId } = await request.json();

  if (!process.env.GEMINI_API_KEY) {
    return Response.json({ error: "Missing Gemini API key" }, { status: 500 });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    await connectToDB();
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Summarize this podcast episode. Here’s the description:\n"${description}".\nAnd here is the audio: ${audioUrl}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    const saved = await SummaryModel.create({episodeId,summary });
    return Response.json({ saved });
  } catch (error) {
    console.error("Gemini summarization error:", error);
    return Response.json({ error: "Failed to summarize" }, { status: 500 });
  }
}
