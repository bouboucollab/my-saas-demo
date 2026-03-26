import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    resume: "Sarah a mené un appel exceptionnel avec Karim. Elle a parfaitement qualifié le besoin, calculé le coût réel des leads perdus (48 000€/mois) et présenté un ROI béton. Le closing est naturel avec un next step concret planifié.",
    score: 9,
    score_justification: "Maîtrise parfaite de la qualification ROI et du closing consultif.",
    objections: ["Complexité de mise en place", "Adhésion des équipes"],
    points_forts: ["Calcul ROI en temps réel", "Qualification financière précise", "Closing naturel", "Next step immédiat"],
    probabilite_closing: 90,
    proba_justification: "Prospect ultra qualifié avec ROI démontré et engagement ferme pour une démo.",
    coaching: "Appel de très haute qualité. La technique de calcul ROI en direct (48 000€/mois perdus) est excellente et crée une urgence naturelle. Pour aller encore plus loin, identifiez le décideur final dès le début et assurez-vous que Karim a le budget ou l'accès au décideur avant la démo vendredi.",
    moments: [
      {"time":"00:30","description":"Qualification — chaos dans le suivi des 12 commerciaux"},
      {"time":"01:45","description":"Douleur confirmée — deals perdus sans explication"},
      {"time":"02:30","description":"Calcul ROI — 30% de leads perdus sur 20 deals"},
      {"time":"03:15","description":"Impact financier — 48 000€ perdus par mois"},
      {"time":"04:00","description":"Démonstration valeur produit — intérêt fort"},
      {"time":"05:00","description":"Objection mise en place — bien traitée"},
      {"time":"05:45","description":"Pricing présenté — ROI évident accepté"},
      {"time":"06:30","description":"Closing réussi — démo live vendredi 9h"}
    ],
    emails: [
      {
        sujet: "Suite à notre échange — Votre démo SalesCoach AI vendredi 9h",
        corps: "Bonjour Karim,\n\nMerci pour notre échange d'aujourd'hui. Comme calculé ensemble, votre équipe perd actuellement environ 48 000€ par mois en leads non suivis. C'est exactement ce que SalesCoach AI va corriger.\n\nPour préparer notre session de vendredi 9h, pouvez-vous me transmettre 3 enregistrements d'appels de vos commerciaux les moins performants ? On les analysera en live pour vous montrer exactement ce qui coince.\n\nÀ vendredi,\nSarah"
      },
      {
        sujet: "Avant vendredi — 1 chose à préparer pour maximiser votre démo",
        corps: "Bonjour Karim,\n\nNotre session est dans 2 jours. Pour qu'elle soit la plus impactante possible :\n\n1. Choisissez vos 3 commerciaux avec les résultats les plus inégaux\n2. Préparez leurs 2-3 derniers appels\n3. Notez les objections récurrentes que vous entendez\n\nAvec ces éléments, je pourrai vous montrer en 20 minutes exactement pourquoi certains closent à 40% et d'autres à 10%.\n\nÀ vendredi 9h,\nSarah"
      },
      {
        sujet: "Bilan de notre démo — Prochaine étape ?",
        corps: "Bonjour Karim,\n\nSuite à notre démo de vendredi, j'espère que vous avez pu constater concrètement comment SalesCoach AI identifie les points de blocage de vos commerciaux.\n\nPour rappel, sur la base de nos calculs :\n• 48 000€/mois de CA récupérable\n• ROI de la licence en moins de 4 jours\n• Onboarding en moins d'une semaine\n\nEst-ce que vous souhaitez qu'on planifie un point cette semaine pour finaliser ?\n\nCordialement,\nSarah"
      }
    ]
  });
}
