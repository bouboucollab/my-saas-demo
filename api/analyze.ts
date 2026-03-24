import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { transcription } = req.body || {};
  const text = transcription || "Appel de démonstration";
  let data: any;
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 1500,
        system: `Tu es un expert commercial B2B senior. Analyse cet appel et retourne UNIQUEMENT un JSON valide sans backticks.`,
        messages: [{ role: "user", content: `Transcription:\n\n${text}` }]
      })
    });
    data = await response.json();
    const raw = (data.content || []).map((b: any) => b.text || "").join("").replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(raw);
    res.status(200).json(parsed);
  } catch (e) {
    res.status(500).json({ error: String(e), raw: JSON.stringify(data) });
  }
}
