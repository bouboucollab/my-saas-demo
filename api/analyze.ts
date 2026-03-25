import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { transcription } = req.body || {};
  res.status(200).json({ 
    transcription: transcription || "Ceci est une transcription démo." 
  });
}
