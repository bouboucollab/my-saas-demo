import type { VercelRequest, VercelResponse } from "@vercel/node";
export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    resume: "Résumé de l'appel démo.",
    score: 8,
    score_justification: "Bonne interaction globale.",
    objections: ["Prix", "Timing"],
    points_forts: ["Argumentaire clair", "Bonne écoute"],
    probabilite_closing: 70,
    proba_justification: "Client intéressé.",
    coaching: "Travaillez sur la conclusion.",
    moments: [
      { time: "00:10", description: "Intro" },
      { time: "01:20", description: "Objection prix" }
    ],
    emails: [
      { sujet: "Objet J+1", corps: "Corps email J+1" },
      { sujet: "Objet J+3", corps: "Corps email J+3" },
      { sujet: "Objet J+7", corps: "Corps email J+7" }
    ]
  });
}