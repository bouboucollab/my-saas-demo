import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({
    resume: "Marie a mené un appel structuré et efficace avec Thomas, directeur commercial. Elle a parfaitement qualifié le besoin, démontré la valeur produit et obtenu un engagement ferme pour un essai gratuit. La conclusion est naturelle et le next step clairement défini.",
    score: 9,
    score_justification: "Excellente maîtrise des étapes de vente, écoute active et closing léger bien exécuté.",
    objections: ["Résistance des commerciaux à la surveillance", "Complexité de mise en place"],
    points_forts: ["Qualification précise du besoin", "Argumentation ROI convaincante", "Closing naturel avec trial", "Écoute active tout au long"],
    probabilite_closing: 85,
    proba_justification: "Prospect chaud avec budget implicite, besoin confirmé et next step planifié.",
    coaching: "Excellent appel dans l'ensemble. Pour aller encore plus loin, quantifiez le coût actuel des leads perdus avant de présenter le pricing — cela renforce l'urgence. Pensez aussi à demander explicitement qui d'autre doit être impliqué dans la décision avant de proposer le trial.",
    moments: [
      {"time":"00:30","description":"Qualification du besoin — suivi manuel et perte de leads identifiés"},
      {"time":"02:15","description":"Démonstration du dashboard — intérêt marqué du prospect"},
      {"time":"04:00","description":"Objection : résistance des commerciaux — bien traitée"},
      {"time":"05:30","description":"Présentation du pricing — légère hésitation"},
      {"time":"06:45","description":"Closing réussi — accord pour trial 14 jours"},
      {"time":"07:30","description":"Next step planifié — point bilan jeudi 14h"}
    ],
    emails: [
      {
        sujet: "Suite à notre échange — Accès à votre essai gratuit SalesCoach AI",
        corps: "Bonjour Thomas,\n\nMerci pour notre échange d'aujourd'hui. Comme convenu, voici votre accès à l'essai gratuit de 14 jours.\n\nPour rappel, SalesCoach AI va permettre à votre équipe de :\n• Identifier pourquoi certains commerciaux closent à 40% et d'autres à 10%\n• Automatiser le suivi et ne plus perdre de leads\n• Avoir une visibilité complète sur les performances\n\nVotre lien d'activation : [lien d'accès]\n\nJe reste disponible pour toute question.\n\nCordialement,\nMarie"
      },
      {
        sujet: "Comment se passe l'onboarding ? + 1 conseil pour démarrer",
        corps: "Bonjour Thomas,\n\nJ'espère que la prise en main se passe bien.\n\nConseil pratique : commencez par analyser les 3 derniers appels de votre commercial le moins performant. Vous verrez immédiatement les patterns à corriger.\n\nNos clients qui font ça en premier constatent une amélioration de 15% dès la première semaine.\n\nOn se retrouve jeudi à 14h pour faire le bilan ensemble.\n\nCordialement,\nMarie"
      },
      {
        sujet: "Bilan de votre essai — Résultats obtenus ?",
        corps: "Bonjour Thomas,\n\nVotre essai gratuit touche à sa fin. J'aimerais faire le point avec vous.\n\nQuestions importantes :\n• Avez-vous pu analyser des appels de votre équipe ?\n• Quels insights avez-vous obtenus ?\n• Quel commercial a le plus progressé ?\n\nNos clients constatent en moyenne +27% de taux de conversion après le premier mois.\n\nPouvons-nous planifier 20 minutes cette semaine pour décider de la suite ?\n\nCordialement,\nMarie"
      }
    ]
  });
}
