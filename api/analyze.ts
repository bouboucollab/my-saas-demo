import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { transcription } = req.body || {};
  const text = (transcription || "").toLowerCase();

  // Détection intelligente basée sur le contenu
  const hasPrice = text.includes("prix") || text.includes("€") || text.includes("budget") || text.includes("coût");
  const hasObjection = text.includes("mais") || text.includes("problème") || text.includes("compliqué") || text.includes("pas sûr") || text.includes("réfléchir");
  const hasPositive = text.includes("intéressant") || text.includes("parfait") || text.includes("oui") || text.includes("accord") || text.includes("super");
  const hasClosing = text.includes("rdv") || text.includes("rendez-vous") || text.includes("démo") || text.includes("essai") || text.includes("vendredi") || text.includes("lundi") || text.includes("semaine");
  const wordCount = text.split(" ").length;
  const isLong = wordCount > 200;

  // Score dynamique
  const score = Math.min(10, Math.max(5,
    7 +
    (hasPositive ? 1 : 0) +
    (hasClosing ? 1 : 0) +
    (hasObjection ? -1 : 0) +
    (isLong ? 1 : 0)
  ));

  // Probabilité dynamique
  const prob = Math.min(95, Math.max(40,
    60 +
    (hasPositive ? 15 : 0) +
    (hasClosing ? 15 : 0) +
    (hasObjection ? -10 : 0) +
    (hasPrice ? -5 : 0)
  ));

  // Objections dynamiques
  const objections = [];
  if (hasPrice) objections.push("Objection sur le prix");
  if (hasObjection) objections.push("Résistance au changement");
  if (!hasClosing) objections.push("Next step non défini");
  if (objections.length === 0) objections.push("Aucune objection majeure détectée");

  // Points forts dynamiques
  const points_forts = [];
  if (hasPositive) points_forts.push("Intérêt prospect confirmé");
  if (hasClosing) points_forts.push("Next step planifié");
  if (isLong) points_forts.push("Appel approfondi et qualitatif");
  if (!hasObjection) points_forts.push("Pas de résistance majeure");
  if (points_forts.length === 0) points_forts.push("Appel structuré");

  // Extraction des prénoms
  const words = transcription?.split(/\s+/) || [];
  const names = words.filter((w: string) => w.length > 2 && w[0] === w[0].toUpperCase() && w[0] !== w[0].toLowerCase()).slice(0, 2);
  const prospect = names[1] || "le prospect";
  const commercial = names[0] || "le commercial";

  res.status(200).json({
    resume: `${commercial} a mené un appel ${score >= 8 ? "excellent" : score >= 6 ? "solide" : "correct"} avec ${prospect}. ${hasPositive ? "Le prospect a montré un intérêt marqué pour la solution." : "La conversation a permis d'identifier les besoins clés."} ${hasClosing ? "Un next step concret a été planifié, ce qui augmente significativement les chances de closing." : "Il manque un next step clair pour faire avancer le deal."}`,
    score,
    score_justification: `${hasPositive ? "Bonne réceptivité du prospect" : "Appel structuré"}${hasClosing ? " et next step défini" : ", next step à formaliser"}${hasObjection ? ", avec des objections à traiter" : ""}.`,
    objections,
    points_forts,
    probabilite_closing: prob,
    proba_justification: `${hasClosing ? "Next step planifié" : "Pas de next step défini"}${hasPositive ? ", prospect réceptif" : ""}${hasPrice ? ", objection prix à lever" : ""}.`,
    coaching: `${score >= 8 ? "Excellent appel dans l'ensemble." : "Bon appel avec des axes d'amélioration clés."} ${hasObjection && hasPrice ? "L'objection prix est un frein classique — quantifiez le ROI avant de parler tarif : montrez combien coûte l'inaction." : ""} ${!hasClosing ? "Point critique : aucun next step n'a été planifié. Sans RDV de suivi, 70% des deals meurent dans les 48h. Terminez toujours par une date précise." : "Le next step est bien défini, c'est un excellent réflexe commercial."} ${hasPositive ? "Capitalisez sur l'intérêt exprimé en envoyant un récapitulatif personnalisé dans les 2h." : "Travaillez à créer plus d'adhésion émotionnelle en utilisant les propres mots du prospect."}`,
    moments: [
      { time: "00:30", description: "Ouverture et prise de contact" },
      { time: "01:30", description: hasObjection ? "Première résistance détectée" : "Qualification du besoin" },
      { time: "02:45", description: hasPrice ? "Discussion sur le pricing — point sensible" : "Présentation de la solution" },
      { time: "04:00", description: hasPositive ? "Signal d'intérêt fort du prospect" : "Exploration des objections" },
      { time: "05:30", description: hasClosing ? "Planification du next step — excellent réflexe" : "Tentative de closing sans next step défini" },
    ],
    emails: [
      {
        sujet: `Suite à notre échange — ${hasClosing ? "Confirmation de notre prochain RDV" : "Prochaine étape pour votre projet"}`,
        corps: `Bonjour ${prospect},\n\nMerci pour notre échange d'aujourd'hui. ${hasPositive ? "Votre intérêt pour la solution m'a vraiment encouragé." : "J'espère avoir pu répondre à vos questions."}\n\n${hasPrice ? "Concernant votre question sur le pricing, je voulais vous rappeler que nos clients récupèrent en moyenne leur investissement en moins de 30 jours grâce aux deals supplémentaires générés.\n\n" : ""}${hasClosing ? "Je vous confirme notre prochain rendez-vous comme convenu." : "Je vous propose qu'on planifie 20 minutes cette semaine pour avancer concrètement."}\n\nCordialement,\n${commercial}`
      },
      {
        sujet: `${prospect} — 1 insight issu de notre appel`,
        corps: `Bonjour ${prospect},\n\nEn repensant à notre échange, j'ai identifié ${hasObjection ? "un point clé que je n'ai pas assez développé" : "une opportunité supplémentaire pour votre équipe"}.\n\n${hasPrice ? "Sur la question du prix : un de nos clients dans votre situation a récupéré 3 deals en 2 semaines grâce à notre outil, soit 24 000€ de CA additionnel. Le ROI était de 4 jours.\n\n" : "Nos clients dans votre secteur constatent en moyenne +27% de taux de closing dès le premier mois.\n\n"}Est-ce que vous auriez 15 minutes cette semaine pour qu'on creuse ce point ensemble ?\n\nCordialement,\n${commercial}`
      },
      {
        sujet: `Dernière tentative — ${prospect}, votre projet avance-t-il ?`,
        corps: `Bonjour ${prospect},\n\nJe me permets de revenir vers vous une dernière fois.\n\nDepuis notre échange, j'ai pensé à votre situation : ${hasObjection ? "les objections que vous avez soulevées sont exactement celles que nos meilleurs clients avaient avant de démarrer." : "votre cas d'usage est précisément celui pour lequel notre solution a été conçue."}\n\n${hasPrice ? "Si le budget est le frein, sachez qu'on peut étudier des modalités adaptées.\n\n" : ""}Si ce n'est plus le bon moment, je comprends tout à fait. Mais si vous êtes encore en réflexion, un simple appel de 10 minutes peut tout changer.\n\nCordialement,\n${commercial}`
      }
    ]
  });
}
