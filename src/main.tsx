import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";

const KF = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
html,body{overflow-x:hidden;max-width:100vw;margin:0;padding:0}
*{box-sizing:border-box;margin:0;padding:0}
body{background:#F8F8FC;color:#0A0A0F;font-family:'Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes fu{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes fi{from{opacity:0}to{opacity:1}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
.a1{animation:fu .5s cubic-bezier(.16,1,.3,1) both}
.a2{animation:fu .5s .07s cubic-bezier(.16,1,.3,1) both}
.a3{animation:fu .5s .14s cubic-bezier(.16,1,.3,1) both}
.a4{animation:fu .5s .21s cubic-bezier(.16,1,.3,1) both}
.a5{animation:fu .5s .28s cubic-bezier(.16,1,.3,1) both}
.ai{animation:fi .3s ease both}
.card{background:#fff;border:1px solid #E4E4EC;border-radius:12px;transition:box-shadow .2s,border-color .2s,transform .2s}
.card:hover{box-shadow:0 4px 20px rgba(0,0,0,.06);border-color:#C8C8D8;transform:translateY(-1px)}
.card-flat{background:#fff;border:1px solid #E4E4EC;border-radius:12px}
@media(max-width:640px){
  .g3{grid-template-columns:1fr!important}
  .g2{grid-template-columns:1fr!important}
  .g4{grid-template-columns:1fr 1fr!important}
  .hide-sm{display:none!important}
  .full-sm{width:100%!important;max-width:100%!important}
  .hero-h{font-size:26px!important}
  .pad{padding:20px 14px!important}
  .kn{font-size:22px!important}
  .rg{grid-template-columns:1fr 1fr!important}
  .ph{font-size:22px!important}
  .pg{grid-template-columns:1fr!important}
  .stack{flex-direction:column!important;gap:10px!important}
}
`;

const C = {
  bg:"#F8F8FC", w:"#FFFFFF",
  b:"#E4E4EC", bm:"#C8C8D8",
  ink:"#0A0A0F", ink2:"#3A3A4A", ink3:"#7A7A8A", ink4:"#B0B0C0",
  navy:"#1E0B5E", navyL:"#EEF0FF",
  green:"#047857", greenL:"#ECFDF5", greenB:"#BBF7D0",
  red:"#B91C1C", redL:"#FEF2F2", redB:"#FECACA",
  amber:"#92400E", amberL:"#FFFBEB", amberB:"#FDE68A",
  blue:"#1D4ED8", blueL:"#EFF6FF", blueB:"#BFDBFE",
};

function useIsMobile() {
  const [m, setM] = useState(typeof window !== "undefined" && window.innerWidth <= 640);
  useEffect(() => {
    const h = () => setM(window.innerWidth <= 640);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return m;
}

function CountUp({ end, suffix = "", duration = 1400 }: { end: number; suffix?: string; duration?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let s = 0;
    const step = end / 70;
    const t = setInterval(() => {
      s += step;
      if (s >= end) { setV(end); clearInterval(t); }
      else setV(Math.floor(s));
    }, duration / 70);
    return () => clearInterval(t);
  }, [end]);
  return <>{v.toLocaleString("fr-FR")}{suffix}</>;
}

const Bar = ({ v, max = 100, color = C.navy }: { v: number; max?: number; color?: string }) => (
  <div style={{ height: 5, background: "#F0F0F5", borderRadius: 3, overflow: "hidden", width: "100%" }}>
    <div style={{ height: "100%", borderRadius: 3, background: color, width: `${Math.min(100, (v / max) * 100)}%`, transition: "width 1.4s cubic-bezier(.16,1,.3,1)" }} />
  </div>
);

const Ring = ({ v, max = 10, color, size = 68 }: { v: number; max?: number; color: string; size?: number }) => {
  const r = 26, circ = 2 * Math.PI * r, off = circ - (v / max) * circ;
  return (
    <svg width={size} height={size} viewBox="0 0 68 68" style={{ flexShrink: 0 }}>
      <circle cx="34" cy="34" r={r} fill="none" stroke="#F0F0F5" strokeWidth="5" />
      <circle cx="34" cy="34" r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"
        transform="rotate(-90 34 34)" style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.16,1,.3,1)" }} />
      <text x="34" y="39" textAnchor="middle" fill={color} fontSize="13" fontWeight="700" fontFamily="Inter,sans-serif">{v}</text>
    </svg>
  );
};

function HeroBanner({ score, prob }: { score: number; prob: number }) {
  const ca = Math.round(prob * 520);
  const days = score >= 8 ? 4 : score >= 6 ? 7 : 12;
  const uplift = score >= 8 ? 27 : score >= 6 ? 18 : 11;
  return (
    <div className="a1" style={{ background: "linear-gradient(135deg,#1E0B5E 0%,#3B1FAB 60%,#1E0B5E 100%)", borderRadius: 14, padding: "28px 24px", marginBottom: 14, width: "100%", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -50, right: -50, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,.04)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", animation: "pulse 2s ease infinite" }} />
          <span style={{ fontSize: 10, color: "rgba(255,255,255,.55)", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>Résultats · Analyse terminée</span>
        </div>
        <div className="rg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0 }}>
          <div style={{ paddingRight: 20, borderRight: "1px solid rgba(255,255,255,.1)" }}>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,.45)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6, fontWeight: 500 }}>💰 CA récupérable</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#4ADE80", letterSpacing: "-0.02em", lineHeight: 1 }}><CountUp end={ca} suffix="€" /></div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", marginTop: 3 }}>/mois estimé</div>
          </div>
          <div style={{ padding: "0 20px", borderRight: "1px solid rgba(255,255,255,.1)" }}>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,.45)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6, fontWeight: 500 }}>📈 Gain closing</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#60A5FA", letterSpacing: "-0.02em", lineHeight: 1 }}>+<CountUp end={uplift} suffix="%" /></div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", marginTop: 3 }}>vs. moyenne</div>
          </div>
          <div style={{ paddingLeft: 20 }}>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,.45)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6, fontWeight: 500 }}>⏱ Rentabilité</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#FBBF24", letterSpacing: "-0.02em", lineHeight: 1 }}><CountUp end={days} suffix=" j" /></div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.35)", marginTop: 3 }}>retour invest.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertBadge({ prob }: { prob: number }) {
  const hot = prob >= 70;
  return (
    <div className="a2 card-flat" style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, marginBottom: 14, borderColor: hot ? C.greenB : C.redB, background: hot ? C.greenL : C.redL, width: "100%" }}>
      <div style={{ fontSize: 18, flexShrink: 0 }}>{hot ? "🔥" : "⚠️"}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: hot ? C.green : C.red, marginBottom: 2 }}>{hot ? `Deal chaud — ${prob}% de probabilité de closing` : "Risque élevé de perte — action requise"}</div>
        <div style={{ fontSize: 11, color: hot ? "#065F46" : "#991B1B" }}>{hot ? "Relance dans les 24h · Priorité haute" : "Retravailler les objections avant le prochain contact"}</div>
      </div>
    </div>
  );
}

function ScoreCards({ analyse }: { analyse: any }) {
  const sc = (v: number, m = 10) => v / m >= .7 ? C.green : v / m >= .5 ? "#D97706" : C.red;
  return (
    <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 14, width: "100%" }}>
      <div className="card" style={{ padding: "18px" }}>
        <div style={{ fontSize: 9, color: C.ink4, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>Performance</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div>
            <div className="kn" style={{ fontSize: 32, fontWeight: 900, color: sc(analyse.score), letterSpacing: "-0.02em", lineHeight: 1 }}>{analyse.score}<span style={{ fontSize: 13, color: C.ink4, fontWeight: 400 }}>/10</span></div>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#D97706", marginTop: 3 }}>+{Math.round(analyse.score * 1.4)}K€ potentiel</div>
          </div>
          <Ring v={analyse.score} max={10} color={sc(analyse.score)} />
        </div>
        <Bar v={analyse.score} max={10} color={sc(analyse.score)} />
        <div style={{ fontSize: 10, color: C.ink3, marginTop: 7, lineHeight: 1.5 }}>{analyse.score_justification}</div>
      </div>
      <div className="card" style={{ padding: "18px" }}>
        <div style={{ fontSize: 9, color: C.ink4, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>Probabilité closing</div>
        <div className="kn" style={{ fontSize: 32, fontWeight: 900, color: sc(analyse.probabilite_closing, 100), letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 3 }}>{analyse.probabilite_closing}<span style={{ fontSize: 13, color: C.ink4, fontWeight: 400 }}>%</span></div>
        <div style={{ fontSize: 10, fontWeight: 600, color: C.green, marginBottom: 8 }}>{Math.round(analyse.probabilite_closing * 85)}€ récupérables</div>
        <Bar v={analyse.probabilite_closing} max={100} color={sc(analyse.probabilite_closing, 100)} />
        <div style={{ fontSize: 10, color: C.ink3, marginTop: 7, lineHeight: 1.5 }}>{analyse.proba_justification}</div>
      </div>
      <div className="card" style={{ padding: "18px" }}>
        <div style={{ fontSize: 9, color: C.ink4, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>Deals à risque</div>
        <div className="kn" style={{ fontSize: 32, fontWeight: 900, color: "#D97706", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 3 }}>{(analyse.objections || []).length}<span style={{ fontSize: 13, color: C.ink4, fontWeight: 400 }}> obj.</span></div>
        <div style={{ fontSize: 10, fontWeight: 600, color: C.red, marginBottom: 8 }}>-{Math.round((analyse.objections || []).length * 8)}K€ si non traitées</div>
        <div>{(analyse.objections || []).slice(0, 3).map((o: string, i: number) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.red, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: C.ink2 }}>{o}</span>
          </div>
        ))}</div>
      </div>
    </div>
  );
}

function AnalyseTab({ analyse }: { analyse: any }) {
  return (
    <div className="ai" style={{ width: "100%" }}>
      <div className="card-flat" style={{ padding: "18px", marginBottom: 10, width: "100%" }}>
        <div style={{ fontSize: 9, color: C.ink4, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>Résumé · Impact CA</div>
        <p style={{ fontSize: 13, color: C.ink2, lineHeight: 1.85 }}>{analyse.resume}</p>
      </div>
      <div className="g2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, width: "100%" }}>
        <div className="card-flat" style={{ padding: "16px", background: C.redL, borderColor: C.redB }}>
          <div style={{ fontSize: 9, color: C.red, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>⚠ Freins au closing</div>
          {(analyse.objections || []).map((o: string, i: number) => (
            <div key={i} style={{ padding: "8px 10px", background: "#FEE2E2", borderRadius: 7, marginBottom: 7 }}>
              <div style={{ fontSize: 11, fontWeight: 500, color: C.red }}>{o}</div>
              <div style={{ fontSize: 10, color: "#991B1B", marginTop: 2 }}>-{Math.round(Math.random() * 5 + 3)}K€ potentiels</div>
            </div>
          ))}
        </div>
        <div className="card-flat" style={{ padding: "16px", background: C.greenL, borderColor: C.greenB }}>
          <div style={{ fontSize: 9, color: C.green, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>✓ Leviers de performance</div>
          {(analyse.points_forts || []).map((p: string, i: number) => (
            <div key={i} style={{ padding: "8px 10px", background: "#DCFCE7", borderRadius: 7, marginBottom: 7 }}>
              <div style={{ fontSize: 11, fontWeight: 500, color: C.green }}>{p}</div>
              <div style={{ fontSize: 10, color: "#065F46", marginTop: 2 }}>+{Math.round(Math.random() * 4 + 2)}K€ potentiels</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineTab({ moments }: { moments: any[] }) {
  const impact = (d: string) => {
    const l = d.toLowerCase();
    if (l.includes("objection") || l.includes("refus") || l.includes("risque")) return { color: C.red, bg: C.redL, icon: "⚠", label: "Risque", amount: `-${Math.round(Math.random() * 5 + 3)}K€` };
    if (l.includes("accord") || l.includes("closing") || l.includes("réussi") || l.includes("planifié")) return { color: C.green, bg: C.greenL, icon: "✓", label: "Gain", amount: `+${Math.round(Math.random() * 8 + 4)}K€` };
    return { color: "#D97706", bg: C.amberL, icon: "◆", label: "Clé", amount: null };
  };
  if (!moments?.length) return null;
  return (
    <div className="card-flat ai" style={{ padding: "20px", width: "100%" }}>
      <div style={{ fontSize: 9, color: C.ink4, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 18 }}>Moments critiques · Timeline business</div>
      <div style={{ position: "relative", paddingLeft: 26 }}>
        <div style={{ position: "absolute", left: 9, top: 4, bottom: 4, width: 2, background: "linear-gradient(to bottom,#1E0B5E,#047857)", borderRadius: 1 }} />
        {moments.map((m: any, i: number) => {
          const imp = impact(m.description);
          return (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 16, position: "relative" }}>
              <div style={{ position: "absolute", left: -26, top: 2, width: 18, height: 18, borderRadius: "50%", background: imp.bg, border: `2px solid ${imp.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 7, color: imp.color, fontWeight: 700, flexShrink: 0 }}>{imp.icon}</div>
              <div style={{ minWidth: 38, fontSize: 10, color: C.ink4, fontVariantNumeric: "tabular-nums", paddingTop: 2, fontWeight: 600, flexShrink: 0 }}>{m.time}</div>
              <div style={{ flex: 1, minWidth: 0, background: imp.bg, borderRadius: 9, padding: "9px 12px" }}>
                <div style={{ fontSize: 12, color: C.ink, lineHeight: 1.5, fontWeight: 500, marginBottom: 4 }}>{m.description}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 9, color: imp.color, fontWeight: 600, background: `${imp.color}20`, padding: "2px 7px", borderRadius: 4 }}>{imp.label}</span>
                  {imp.amount && <span style={{ fontSize: 10, color: imp.color, fontWeight: 700 }}>{imp.amount}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EmailsTab({ emails }: { emails: any[] }) {
  const [t, setT] = useState(0);
  const [cp, setCp] = useState(false);
  const tabs = [{ l: "J+1", c: C.green }, { l: "J+3", c: "#D97706" }, { l: "J+7", c: C.navy }];
  if (!emails?.length) return null;
  const copy = () => { navigator.clipboard.writeText(`Objet: ${emails[t]?.sujet}\n\n${emails[t]?.corps}`); setCp(true); setTimeout(() => setCp(false), 2000); };
  return (
    <div className="ai" style={{ width: "100%" }}>
      <div className="card-flat" style={{ padding: "10px 14px", marginBottom: 12, background: C.blueL, borderColor: C.blueB, display: "flex", alignItems: "flex-start", gap: 8 }}>
        <span style={{ fontSize: 14, flexShrink: 0 }}>💡</span>
        <span style={{ fontSize: 11, color: C.blue, fontWeight: 500, lineHeight: 1.5 }}>Séquence optimisée · <strong>+3 à 5 RDV supplémentaires</strong> · Taux de réponse estimé : 34%</span>
      </div>
      <div style={{ display: "flex", gap: 6, marginBottom: 12, overflowX: "auto", WebkitOverflowScrolling: "touch" as any, paddingBottom: 2 }}>
        {tabs.map((tb, i) => (
          <button key={i} onClick={() => setT(i)} style={{ background: t === i ? tb.c : "#fff", border: `1.5px solid ${t === i ? tb.c : C.b}`, color: t === i ? "#fff" : C.ink2, padding: "7px 14px", borderRadius: 7, fontSize: 11, cursor: "pointer", fontFamily: "inherit", fontWeight: t === i ? 600 : 500, whiteSpace: "nowrap", flexShrink: 0, minHeight: 36, transition: "all .15s" }}>{tb.l}</button>
        ))}
      </div>
      <div className="card-flat" style={{ overflow: "hidden" }}>
        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.b}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, background: "#F8F8FC" }}>
          <div>
            <div style={{ fontSize: 9, color: C.ink4, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 3 }}>Objet</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.ink, lineHeight: 1.4 }}>{emails[t]?.sujet}</div>
          </div>
          <button onClick={copy} style={{ background: cp ? C.greenL : "#fff", border: `1px solid ${cp ? C.greenB : C.b}`, color: cp ? C.green : C.ink3, fontSize: 11, padding: "6px 12px", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", fontWeight: 500, flexShrink: 0, minHeight: 34, transition: "all .2s" }}>{cp ? "✓ Copié" : "Copier"}</button>
        </div>
        <div style={{ padding: "16px", fontSize: 13, lineHeight: 1.9, color: C.ink2, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{emails[t]?.corps}</div>
      </div>
    </div>
  );
}

function CoachingTab({ coaching, transcription }: { coaching: string; transcription: string }) {
  return (
    <div className="ai" style={{ width: "100%" }}>
      <div className="card-flat" style={{ padding: "18px", marginBottom: 10, background: C.navyL, borderColor: "#C4B5FD", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <div style={{ width: 30, height: 30, borderRadius: 7, background: C.navy, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🎓</div>
          <div style={{ fontSize: 9, color: C.navy, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700 }}>Plan d'action personnalisé · IA</div>
        </div>
        <p style={{ fontSize: 13, color: "#3730A3", lineHeight: 1.9 }}>{coaching}</p>
      </div>
      <div className="card-flat" style={{ padding: "16px", width: "100%" }}>
        <div style={{ fontSize: 9, color: C.ink4, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>Transcription analysée</div>
        <div style={{ fontSize: 11, color: C.ink3, lineHeight: 1.8, maxHeight: 180, overflow: "auto", whiteSpace: "pre-wrap", wordBreak: "break-word", background: C.bg, padding: "12px", borderRadius: 7 }}>{transcription}</div>
      </div>
    </div>
  );
}

function Loader() {
  const [s, setS] = useState(0);
  const steps = ["Analyse de la transcription", "Détection des signaux commerciaux", "Calcul de l'impact financier", "Génération des emails de relance"];
  useEffect(() => {
    const t1 = setTimeout(() => setS(1), 1200);
    const t2 = setTimeout(() => setS(2), 2600);
    const t3 = setTimeout(() => setS(3), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "80px 16px" }}>
      <div className="card-flat" style={{ padding: "36px 28px", maxWidth: 380, textAlign: "center", width: "100%" }}>
        <div style={{ width: 36, height: 36, border: `2px solid ${C.navy}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin .8s linear infinite", margin: "0 auto 22px" }} />
        <div style={{ fontSize: 15, fontWeight: 700, color: C.ink, marginBottom: 5 }}>Analyse en cours</div>
        <div style={{ fontSize: 12, color: C.ink3, marginBottom: 24 }}>Calcul de l'impact sur votre CA</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7, textAlign: "left" }}>
          {steps.map((st, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 11px", background: i <= s ? C.navyL : "#F8F8FC", border: `1px solid ${i <= s ? "#C4B5FD" : C.b}`, borderRadius: 8, transition: "all .4s" }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", background: i < s ? C.green : i === s ? C.navy : "#E8E8EE", border: `2px solid ${i < s ? C.green : i === s ? C.navy : C.b}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {i < s && <svg width="7" height="7" viewBox="0 0 8 8"><polyline points="1,4 3,6 7,2" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>}
                {i === s && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#fff", animation: "pulse 1s ease infinite" }} />}
              </div>
              <span style={{ fontSize: 11, color: i <= s ? C.navy : C.ink3, fontWeight: i <= s ? 600 : 400 }}>{st}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PricingPage({ onBack }: { onBack: () => void }) {
  const [faq, setFaq] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const plans = [
    { id: "starter", name: "Starter", price: "2 000", monthly: "49", desc: "Pour les entrepreneurs", accent: C.ink3, border: C.b, highlight: false, features: ["1 utilisateur", "50 analyses / mois", "Score et objections", "Emails de relance", "Dashboard basique", "Support email"], cta: "Commencer" },
    { id: "pro", name: "Pro", price: "5 000", monthly: "99", desc: "Pour les équipes commerciales", accent: C.navy, border: C.navy, highlight: true, badge: "⭐ Recommandé", roi: "Récupérez jusqu'à 40 000€/mois", features: ["Jusqu'à 10 commerciaux", "Analyses illimitées", "Détection objections IA", "Calcul ROI automatique", "Dashboard équipe", "Recommandations IA", "Timeline des appels", "Emails de relance", "Support prioritaire"], cta: "Démarrer maintenant" },
    { id: "agency", name: "Agency", price: "12 000", monthly: "299", desc: "Pour les agences et revendeurs", accent: C.amber, border: C.amberB, highlight: false, features: ["Utilisateurs illimités", "Multi-équipes", "White label complet", "Accès API", "Intégration CRM", "Manager dédié", "Support 24/7", "Formation incluse"], cta: "Nous contacter" },
  ];
  const faqs = [
    { q: "Combien de temps pour la mise en place ?", a: "Moins d'une semaine. Notre équipe vous accompagne de A à Z." },
    { q: "Quel est le ROI moyen constaté ?", a: "Nos clients récupèrent 20 000 à 50 000€/mois. Retour sur investissement en 4 à 7 jours." },
    { q: "Compatible avec mon CRM ?", a: "Oui. HubSpot, Salesforce, Pipedrive et tous les CRM majeurs." },
    { q: "Pourquoi une licence unique ?", a: "Vous payez une fois et possédez l'outil pour toujours. La maintenance couvre les mises à jour et le support." },
  ];
  const orderedPlans = isMobile ? [plans[1], plans[0], plans[2]] : plans;
  return (
    <div className="pad" style={{ maxWidth: 960, margin: "0 auto", padding: "44px 16px", width: "100%" }}>
      <div className="a1" style={{ textAlign: "center", marginBottom: 44 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: C.navyL, border: `1px solid #C4B5FD`, borderRadius: 20, padding: "5px 14px", marginBottom: 16 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.navy }} />
          <span style={{ fontSize: 10, color: C.navy, fontWeight: 600, letterSpacing: "0.08em" }}>PRICING</span>
        </div>
        <h1 className="ph" style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 12, color: C.ink }}>
          Choisissez le plan qui va transformer<br />
          <span style={{ color: C.navy }}>votre chiffre d'affaires</span>
        </h1>
        <p style={{ fontSize: 14, color: C.ink3, maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}>Récupérez jusqu'à <strong style={{ color: C.green }}>50 000€/mois</strong> perdus dans vos ventes</p>
      </div>

      <div className="pg a2" style={{ display: "grid", gridTemplateColumns: "1fr 1.08fr 1fr", gap: 12, marginBottom: 40 }}>
        {orderedPlans.map(plan => (
          <div key={plan.id} style={{ background: C.w, border: `1.5px solid ${plan.border}`, borderRadius: 14, padding: plan.highlight ? "26px 20px" : "20px 16px", boxShadow: plan.highlight ? "0 8px 40px rgba(30,11,94,.12)" : "0 2px 8px rgba(0,0,0,.04)", position: "relative", width: "100%" }}>
            {plan.badge && <div style={{ background: C.navy, color: "#fff", fontSize: 10, padding: "4px 14px", borderRadius: 20, fontWeight: 700, textAlign: "center", marginBottom: 14 }}>{plan.badge}</div>}
            {(plan as any).roi && <div style={{ background: C.greenL, border: `1px solid ${C.greenB}`, borderRadius: 7, padding: "7px 10px", marginBottom: 14, textAlign: "center" }}><span style={{ fontSize: 10, color: C.green, fontWeight: 600 }}>💰 {(plan as any).roi}</span></div>}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 9, color: C.ink4, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: 5 }}>{plan.name}</div>
              <div style={{ fontSize: 30, fontWeight: 900, color: plan.highlight ? C.navy : C.ink, letterSpacing: "-0.02em", marginBottom: 3 }}>{plan.price}€</div>
              <div style={{ fontSize: 11, color: C.ink3, marginBottom: 5 }}>+ {plan.monthly}€/mois</div>
              <div style={{ fontSize: 11, color: C.ink2 }}>{plan.desc}</div>
            </div>
            <div style={{ height: 1, background: C.b, marginBottom: 14 }} />
            <div style={{ marginBottom: 18 }}>
              {plan.features.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 7, marginBottom: 8 }}>
                  <div style={{ width: 14, height: 14, borderRadius: "50%", background: plan.highlight ? C.navyL : C.greenL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <svg width="6" height="6" viewBox="0 0 8 8"><polyline points="1,4 3,6 7,2" fill="none" stroke={plan.highlight ? C.navy : C.green} strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </div>
                  <span style={{ fontSize: 11, color: C.ink2, lineHeight: 1.4 }}>{f}</span>
                </div>
              ))}
            </div>
            <button style={{ width: "100%", minHeight: 46, background: plan.highlight ? C.navy : plan.id === "agency" ? "#92400E" : "#fff", color: plan.highlight || plan.id === "agency" ? "#fff" : C.navy, border: `1.5px solid ${plan.highlight ? C.navy : plan.id === "agency" ? "#92400E" : C.navy}`, borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all .2s" }}>{plan.cta} →</button>
          </div>
        ))}
      </div>

      {/* ROI Block */}
      <div className="a3 card-flat" style={{ padding: "24px 20px", marginBottom: 24, background: C.greenL, borderColor: C.greenB, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 9, color: C.green, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, marginBottom: 5 }}>Calculateur ROI</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: C.ink, letterSpacing: "-0.02em" }}>Votre situation actuelle</div>
        </div>
        <div className="rg" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 16 }}>
          {[{ l: "Deals / mois", v: "20", c: C.ink }, { l: "% perdus", v: "30%", c: C.red }, { l: "Ticket moyen", v: "5 000€", c: C.ink }, { l: "CA perdu", v: "30 000€", c: C.red }].map((item, i) => (
            <div key={i} style={{ textAlign: "center", padding: "12px 8px", background: "#DCFCE7", borderRadius: 9, border: `1px solid ${C.greenB}` }}>
              <div style={{ fontSize: 9, color: "#065F46", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 5, fontWeight: 600 }}>{item.l}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: item.c }}>{item.v}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", padding: "12px", background: "#DCFCE7", border: `1px solid ${C.greenB}`, borderRadius: 9 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.green, marginBottom: 3 }}>✅ Rentabilité en 4 à 7 jours</div>
          <div style={{ fontSize: 11, color: "#065F46" }}>5 000€ de licence · 30 000€/mois récupérables</div>
        </div>
      </div>

      {/* Garantie */}
      <div className="a4 card-flat stack" style={{ padding: "20px", marginBottom: 24, display: "flex", alignItems: "center", gap: 14, borderColor: C.greenB, background: C.greenL, width: "100%" }}>
        <div style={{ fontSize: 36, flexShrink: 0 }}>🛡️</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, color: C.ink }}>Garantie satisfait ou remboursé 7 jours</div>
          <div style={{ fontSize: 12, color: C.ink2, lineHeight: 1.6 }}>Pas de résultat visible dans les 7 premiers jours ? On vous rembourse intégralement.</div>
        </div>
        <div style={{ flexShrink: 0, background: "#DCFCE7", border: `1px solid ${C.greenB}`, color: C.green, fontSize: 10, padding: "6px 14px", borderRadius: 20, fontWeight: 700, whiteSpace: "nowrap" }}>✓ Garanti</div>
      </div>

      {/* FAQ */}
      <div className="a5">
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: C.ink, letterSpacing: "-0.02em", marginBottom: 5 }}>Questions fréquentes</div>
          <div style={{ fontSize: 12, color: C.ink3 }}>Tout ce que vous devez savoir</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {faqs.map((item, i) => (
            <div key={i} className="card-flat" style={{ overflow: "hidden", cursor: "pointer", borderColor: faq === i ? C.navy : C.b }} onClick={() => setFaq(faq === i ? null : i)}>
              <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: faq === i ? C.navy : C.ink, flex: 1, lineHeight: 1.4 }}>{item.q}</span>
                <span style={{ fontSize: 16, color: C.ink4, flexShrink: 0, transition: "transform .2s", display: "inline-block", transform: faq === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
              </div>
              {faq === i && <div style={{ padding: "0 16px 14px", borderTop: `1px solid ${C.b}`, paddingTop: 12, fontSize: 13, color: C.ink2, lineHeight: 1.7 }}>{item.a}</div>}
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 36 }}>
        <button onClick={onBack} style={{ background: "#fff", color: C.navy, border: `1.5px solid ${C.navy}`, borderRadius: 8, padding: "11px 24px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", minHeight: 44, maxWidth: 260, width: "100%" }}>← Retour à l'analyse</button>
      </div>
    </div>
  );
}

function App() {
  const [ph, setPh] = useState("idle");
  const [tx, setTx] = useState("");
  const [res, setRes] = useState<any>(null);
  const [err, setErr] = useState("");
  const [ab, setAb] = useState<File | null>(null);
  const [tab, setTab] = useState("analyse");
  const [drag, setDrag] = useState(false);
  const [page, setPage] = useState("app");
  const fr = useRef<HTMLInputElement>(null);

  const onFile = (e: any) => { const f = e.target.files[0]; if (f) setAb(f); };
  const onDrop = (e: any) => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f?.type.startsWith("audio/")) setAb(f); };

  const analyze = async () => {
    setPh("processing");
    try {
      const { transcription } = await fetch("/api/transcribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ transcription: tx || "" }) }).then(r => r.json());
      const analyse = await fetch("/api/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ transcription }) }).then(r => r.json());
      const email = await fetch("/api/email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ transcription, analyse }) }).then(r => r.json());
      setRes({ transcription, analyse, email });
      setPh("done"); setTab("analyse");
    } catch (e) { setErr("Erreur de connexion. Réessayez."); setPh("err"); }
  };

  const reset = () => { setPh("idle"); setRes(null); setTx(""); setAb(null); setErr(""); };
  const TABS = [{ id: "analyse", l: "Impact CA" }, { id: "timeline", l: "Timeline" }, { id: "emails", l: "Emails" }, { id: "coaching", l: "Coaching" }];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, width: "100%", overflowX: "hidden" }}>
      <style>{KF}</style>

      <nav style={{ height: 54, borderBottom: `1px solid ${C.b}`, padding: "0 18px", display: "flex", alignItems: "center", gap: 8, background: C.w, position: "sticky", top: 0, zIndex: 20, width: "100%" }}>
        <div style={{ width: 26, height: 26, borderRadius: 6, background: C.navy, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
        </div>
        <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.01em", color: C.ink }}>SalesCoach</span>
        <span style={{ fontSize: 9, background: C.navyL, border: `1px solid #C4B5FD`, color: C.navy, padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>PRO</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.green, animation: "pulse 2s ease infinite" }} />
            <span className="hide-sm" style={{ fontSize: 10, color: C.ink4 }}>IA active</span>
          </div>
          <button onClick={() => setPage(page === "pricing" ? "app" : "pricing")} style={{ background: "#fff", color: C.ink2, border: `1px solid ${C.b}`, fontSize: 11, padding: "5px 10px", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", fontWeight: 500, minHeight: 32 }}>{page === "pricing" ? "← Analyser" : "💰 Pricing"}</button>
          {ph !== "idle" && ph !== "err" && page === "app" && <button onClick={reset} style={{ background: "#fff", color: C.ink2, border: `1px solid ${C.b}`, fontSize: 11, padding: "5px 10px", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", fontWeight: 500, minHeight: 32 }}>← Nouveau</button>}
        </div>
      </nav>

      {page === "pricing" ? (
        <PricingPage onBack={() => setPage("app")} />
      ) : (
        <div className="pad" style={{ maxWidth: 940, margin: "0 auto", padding: "32px 14px", width: "100%" }}>

          {ph === "idle" && (
            <div>
              <div className="a1" style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", background: C.w, border: `1px solid ${C.b}`, borderRadius: 9, marginBottom: 24, flexWrap: "wrap", gap: 7 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.green, animation: "pulse 2s ease infinite", flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: C.ink3, fontWeight: 500 }}>Utilisé par des équipes commerciales performantes</span>
                <div style={{ marginLeft: "auto", display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {["🔒 Sécurisé", "⚡ 30 secondes", "💰 ROI garanti"].map((b, i) => (
                    <span key={i} style={{ fontSize: 10, color: C.ink4, fontWeight: 500 }}>{b}</span>
                  ))}
                </div>
              </div>

              <div className="a2" style={{ marginBottom: 32 }}>
                <h1 className="hero-h" style={{ fontSize: 34, fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em", color: C.ink, marginBottom: 12 }}>
                  Transformez chaque appel<br />
                  <span style={{ color: C.navy }}>en chiffre d'affaires.</span>
                </h1>
                <p style={{ fontSize: 14, color: C.ink3, lineHeight: 1.7, maxWidth: 480 }}>Identifiez les deals à risque, récupérez les opportunités manquées et augmentez votre taux de closing en 30 secondes.</p>
              </div>

              <div className="g4 a3" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 24 }}>
                {[{ icon: "💰", l: "CA récupérable", v: "48K€/mois" }, { icon: "📈", l: "Gain closing", v: "+27%" }, { icon: "⚡", l: "Rentabilité", v: "4 jours" }, { icon: "🎯", l: "Précision IA", v: "94%" }].map((k, i) => (
                  <div key={i} className="card" style={{ padding: "14px 10px", textAlign: "center" }}>
                    <div style={{ fontSize: 16, marginBottom: 5 }}>{k.icon}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 2 }}>{k.v}</div>
                    <div style={{ fontSize: 9, color: C.ink4, letterSpacing: "0.06em", textTransform: "uppercase" }}>{k.l}</div>
                  </div>
                ))}
              </div>

              <div className="g2 a4" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                <div className="card" style={{ padding: "22px 16px", cursor: "pointer", textAlign: "center", border: `1.5px dashed ${drag ? C.navy : ab ? C.greenB : C.bm}`, background: drag ? C.navyL : ab ? C.greenL : C.w, minHeight: 130, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 7 }}
                  onClick={() => fr.current?.click()}
                  onDragOver={e => { e.preventDefault(); setDrag(true); }}
                  onDragLeave={() => setDrag(false)}
                  onDrop={onDrop}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: ab ? C.greenL : C.navyL, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ab ? C.green : C.navy} strokeWidth="1.8"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: ab ? C.green : C.ink }}>{ab ? ab.name : "Uploader un enregistrement"}</div>
                  <div style={{ fontSize: 10, color: C.ink4 }}>{ab ? "Prêt à analyser ✓" : "MP3, WAV, M4A"}</div>
                </div>
                <div className="card" style={{ padding: "16px", minHeight: 130 }}>
                  <div style={{ fontSize: 9, color: C.ink4, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>Transcription</div>
                  <textarea value={tx} onChange={e => setTx(e.target.value)}
                    placeholder="Collez la transcription de l'appel..."
                    style={{ width: "100%", height: 80, background: "transparent", border: "none", color: C.ink, padding: 0, fontSize: 12, fontFamily: "inherit", resize: "none", outline: "none", lineHeight: 1.7, boxSizing: "border-box" }}
                  />
                </div>
              </div>
              <input ref={fr} type="file" accept="audio/*" style={{ display: "none" }} onChange={onFile} />

              {(ab || tx.trim()) && (
                <div className="a5">
                  <button onClick={analyze} style={{ background: C.navy, color: "#fff", border: "none", padding: "13px 36px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", minHeight: 48, width: "100%", maxWidth: 380, boxShadow: "0 4px 20px rgba(30,11,94,.25)", transition: "all .2s" }}>
                    Calculer l'impact sur mon CA →
                  </button>
                </div>
              )}
            </div>
          )}

          {ph === "processing" && <Loader />}

          {ph === "err" && (
            <div className="a1" style={{ display: "flex", justifyContent: "center", padding: "60px 0" }}>
              <div className="card-flat" style={{ padding: "28px", textAlign: "center", maxWidth: 340, width: "100%", borderColor: C.redB, background: C.redL }}>
                <div style={{ fontSize: 12, color: C.red, fontWeight: 600, marginBottom: 14 }}>{err}</div>
                <button onClick={reset} style={{ background: C.navy, color: "#fff", border: "none", padding: "11px 24px", borderRadius: 7, fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, width: "100%", minHeight: 42 }}>Réessayer</button>
              </div>
            </div>
          )}

          {ph === "done" && res && (
            <div style={{ width: "100%" }}>
              <HeroBanner score={res.analyse.score} prob={res.analyse.probabilite_closing} />
              <AlertBadge prob={res.analyse.probabilite_closing} />
              <ScoreCards analyse={res.analyse} />

              <div className="a3" style={{ display: "flex", background: C.w, border: `1px solid ${C.b}`, borderRadius: "10px 10px 0 0", overflowX: "auto", WebkitOverflowScrolling: "touch" as any }}>
                {TABS.map(t => (
                  <button key={t.id} onClick={() => setTab(t.id)} style={{ background: "transparent", border: "none", borderBottom: `2px solid ${tab === t.id ? C.navy : "transparent"}`, color: tab === t.id ? C.navy : C.ink3, fontSize: 12, padding: "10px 16px", cursor: "pointer", fontFamily: "inherit", fontWeight: tab === t.id ? 600 : 400, marginBottom: -1, whiteSpace: "nowrap", flexShrink: 0, transition: "all .15s" }}>{t.l}</button>
                ))}
              </div>

              <div style={{ background: C.w, border: `1px solid ${C.b}`, borderTop: "none", borderRadius: "0 0 10px 10px", padding: "18px", marginBottom: 14, width: "100%" }}>
                {tab === "analyse" && <AnalyseTab analyse={res.analyse} />}
                {tab === "timeline" && <TimelineTab moments={res.analyse.moments} />}
                {tab === "emails" && <EmailsTab emails={res.analyse.emails} />}
                {tab === "coaching" && <CoachingTab coaching={res.analyse.coaching} transcription={res.transcription} />}
              </div>

              <div className="card" style={{ padding: "20px", textAlign: "center", background: "linear-gradient(135deg,#EEF0FF,#ECFDF5)", borderColor: "#C4B5FD" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.ink, marginBottom: 5 }}>Prêt à récupérer vos deals perdus ?</div>
                <div style={{ fontSize: 12, color: C.ink3, marginBottom: 16, lineHeight: 1.5 }}>Rejoignez les équipes qui récupèrent en moyenne 30 000€/mois</div>
                <button onClick={() => setPage("pricing")} style={{ background: C.navy, color: "#fff", border: "none", padding: "12px 28px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", minHeight: 44, maxWidth: 260, width: "100%", boxShadow: "0 4px 16px rgba(30,11,94,.2)" }}>Voir les offres →</button>
              </div>
            </div>
          )}
        </div>
      )}

      <footer style={{ borderTop: `1px solid ${C.b}`, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 7, background: C.w }}>
        <span style={{ fontSize: 10, color: C.ink4, fontWeight: 500 }}>SalesCoach AI · Revenue Intelligence</span>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.green }} />
          <span style={{ fontSize: 10, color: C.ink4 }}>Tous systèmes opérationnels</span>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><App /></React.StrictMode>
);
