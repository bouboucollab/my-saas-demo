import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { transcription } = req.body || {};
  const text = transcription || "Appel de démonstration";

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
        system: `Tu es un expert commercial B2B senior de haut niveau. Analyse cet appel commercial et retourne UNIQUEMENT un JSON valide (sans backticks) avec cette structure exacte:
{
  "resume": "résumé précis et percutant en 2-3 phrases",
  "score": <1-10>,
  "score_justification": "justification experte en 1 phrase",
  "objections": ["objection précise 1", "objection précise 2"],
  "points_forts": ["point fort précis 1", "point fort précis 2"],
  "probabilite_closing": <0-100>,
  "proba_justification": "justification précise en 1 phrase",
  "coaching": "conseil de coaching expert, actionnable et personnalisé en 3-4 phrases",
  "moments": [
    {"time":"00:00","description":"description précise du moment clé"},
    {"time":"00:00","description":"description précise"}
  ],
  "emails": [
    {"sujet":"objet email J+1 personnalisé","corps":"email J+1 professionnel et personnalisé"},
    {"sujet":"objet email J+3 personnalisé","corps":"email J+3 professionnel et personnalisé"},
    {"sujet":"objet email J+7 personnalisé","corps":"email J+7 professionnel et personnalisé"}
  ]
}`,
        messages: [{ role: "user", content: `Transcription:\n\n${text}` }]
      })
    });

    const data = await response.json();
    const raw = (data.content || []).map((b: any) => b.text || "").join("").replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(raw);
    res.status(200).json(parsed);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
