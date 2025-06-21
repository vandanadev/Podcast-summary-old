import { GoogleGenAI } from "@google/genai";
import { connectToDB } from "@/lib/mongodb";
import { SummaryModel } from "@/models/Summary";

export async function POST(request: Request) {
  const { episodeId, audio } = await request.json();

  if (!process.env.GEMINI_API_KEY) {
    return Response.json({ error: "Missing Gemini API key" }, { status: 500 });
  }

  if (!audio || typeof audio !== 'string') {
    return Response.json({ error: "Audio URL is required" }, { status: 400 });
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  try {
    await connectToDB();
    
    // Download the audio file and convert to base64
    const audioResponse = await fetch(audio);
    if (!audioResponse.ok) {
      return Response.json({ error: "Failed to download audio file" }, { status: 500 });
    }
    
    const audioBuffer = await audioResponse.arrayBuffer();
    const base64AudioFile = Buffer.from(audioBuffer).toString('base64');

    // Create content with inline audio data
    const contents = [
      { text: "Summarize this podcast audio. In summary point out important outcomes in simple straight forward language and response should be in simple string." },
      {
        inlineData: {
          mimeType: "audio/mp3",
          data: base64AudioFile,
        },
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contents,
    });
    const summary = response.text;

    const saved = await SummaryModel.create({ episodeId, summary });

    return Response.json({ saved });

  } catch (error) {
    console.error("Gemini summarization error:", error);
    return Response.json({ error: "Failed to summarize" }, { status: 500 });
  }
}
