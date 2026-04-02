import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";

const KF = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
html,body{overflow-x:hidden;max-width:100vw;margin:0;padding:0}
*{box-sizing:border-box;margin:0;padding:0}
body{background:#FAFAFA;color:#0A0A0F;font-family:'Inter',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes fu{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes fi{from{opacity:0}to{opacity:1}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
@keyframes countUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
@keyframes barIn{from{width:0}to{width:var(--w)}}
@keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
.a1{animation:fu .5s cubic-bezier(.16,1,.3,1) both}
.a2{animation:fu .5s .07s cubic-bezier(.16,1,.3,1) both}
.a3{animation:fu .5s .14s cubic-bezier(.16,1,.3,1) both}
.a4{animation:fu .5s .21s cubic-bezier(.16,1,.3,1) both}
.a5{animation:fu .5s .28s cubic-bezier(.16,1,.3,1) both}
.ai{animation:fi .3s ease both}
.card{background:#fff;border:1px solid #E8E8EE;border-radius:14px;transition:box-shadow .2s,border-color .2s,transform .2s}
.card:hover{box-shadow:0 4px 24px rgba(0,0,0,.07);border-color:#D0D0DA;transform:translateY(-1px)}
.card-flat{background:#fff;border:1px solid #E8E8EE;border-radius:14px}
.btn-primary{background:#1A0B4B;color:#fff;border:none;border-radius:9px;padding:13px 28px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s;letter-spacing:-.01em}
.btn-primary:hover{background:#2D1580;box-shadow:0 6px 24px rgba(26,11,75,.3);transform:translateY(-1px)}
.btn-secondary{background:#fff;color:#1A0B4B;border:1.5px solid #1A0B4B;border-radius:9px;padding:12px 24px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s}
.btn-secondary:hover{background:#F5F3FF}
.tab-btn{background:transparent;border:none;font-family:inherit;cursor:pointer;transition:all .15s;padding:10px 16px;font-size:13px;font-weight:500;border-bottom:2px solid transparent;white-space:nowrap}
.tag{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:500;padding:3px 9px;border-radius:5px;margin-right:6px;margin-bottom:6px}
@media(max-width:640px){
  .grid-3{grid-template-columns:1fr!important}
  .grid-2{grid-template-columns:1fr!important}
  .grid-4{grid-template-columns:1fr 1fr!important}
  .hero-title{font-size:26px!important;line-height:1.2!important}
  .hero-sub{font-size:13px!important}
  .pad{padding:20px 16px!important}
  .hide-sm{display:none!important}
  .full-sm{width:100%!important}
  .kpi-n{font-size:24px!important}
  .stack-sm{flex-direction:column!important;gap:10px!important}
  .pricing-h{font-size:24px!important}
  .plan-grid{grid-template-columns:1fr!important}
  .roi-grid{grid-template-columns:1fr 1fr!important}
}
`;

const C = {
  bg:"#FAFAFA", white:"#FFFFFF",
  b:"#E8E8EE", bm:"#D0D0DA",
  ink:"#0A0A0F", ink2:"#3A3A4A", ink3:"#7A7A8A", ink4:"#B0B0BA",
  navy:"#1A0B4B", navyL:"#F0EDFF",
  green:"#047857", greenL:"#ECFDF5", greenB:"#A7F3D0",
  red:"#B91C1C", redL:"#FEF2F2", redB:"#FECACA",
  amber:"#92400E", amberL:"#FFFBEB", amberB:"#FDE68A",
  blue:"#1D4ED8", blueL:"#EFF6FF", blueB:"#BFDBFE",
};

function useIsMobile(){
  const [m,setM]=useState(typeof window!=="undefined"&&window.innerWidth<=640);
  useEffect(()=>{const h=()=>setM(window.innerWidth<=640);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);
  return m;
}

function CountUp({end,prefix="",suffix="",duration=1400}){
  const [v,setV]=useState(0);
  useEffect(()=>{
    let s=0;const step=end/70;
    const t=setInterval(()=>{s+=step;if(s>=end){setV(end);clearInterval(t);}else setV(Math.floor(s));},duration/70);
    return()=>clearInterval(t);
  },[end]);
  return <>{prefix}{v.toLocaleString("fr-FR")}{suffix}</>;
}

const Divider=({label})=>(
  <div style={{display:"flex",alignItems:"center",gap:12,margin:"24px 0 18px"}}>
    <div style={{flex:1,height:1,background:C.b}}/>
    <span style={{fontSize:10,fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:C.ink4}}>{label}</span>
    <div style={{flex:1,height:1,background:C.b}}/>
  </div>
);

const KPICard=({icon,label,value,sub,color=C.navy,bg=C.navyL,trend})=>(
  <div className="card" style={{padding:"18px 20px",background:C.white}}>
    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:12}}>
      <div style={{width:36,height:36,borderRadius:9,background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{icon}</div>
      {trend&&<span style={{fontSize:11,fontWeight:600,color:trend>0?C.green:C.red,background:trend>0?C.greenL:C.redL,padding:"2px 8px",borderRadius:20}}>{trend>0?"+":""}{trend}%</span>}
    </div>
    <div className="kpi-n" style={{fontSize:26,fontWeight:800,color:C.ink,letterSpacing:"-0.02em",marginBottom:3,lineHeight:1}}>{value}</div>
    <div style={{fontSize:12,fontWeight:500,color:C.ink2,marginBottom:2}}>{label}</div>
    {sub&&<div style={{fontSize:11,color:C.ink3}}>{sub}</div>}
  </div>
);

const ProgressBar=({v,max=100,color=C.navy,height=6})=>(
  <div style={{height,background:"#F0F0F5",borderRadius:3,overflow:"hidden",width:"100%"}}>
    <div style={{height:"100%",borderRadius:3,background:color,width:`${Math.min(100,(v/max)*100)}%`,transition:"width 1.4s cubic-bezier(.16,1,.3,1)"}}/>
  </div>
);

const ScoreRing=({v,max=10,color,size=72})=>{
  const r=28,circ=2*Math.PI*r,off=circ-(v/max)*circ;
  return(
    <svg width={size} height={size} viewBox="0 0 72 72" style={{flexShrink:0}}>
      <circle cx="36" cy="36" r={r} fill="none" stroke="#F0F0F5" strokeWidth="5"/>
      <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"
        transform="rotate(-90 36 36)" style={{transition:"stroke-dashoffset 1.4s cubic-bezier(.16,1,.3,1)"}}/>
      <text x="36" y="41" textAnchor="middle" fill={color} fontSize="14" fontWeight="700" fontFamily="'Inter',sans-serif">{v}</text>
    </svg>
  );
};

function HeroBanner({score,prob}){
  const ca=Math.round(prob*520);
  const days=score>=8?4:score>=6?7:12;
  const uplift=score>=8?27:score>=6?18:11;
  return(
    <div className="a1" style={{background:"linear-gradient(135deg,#1A0B4B 0%,#2D1580 50%,#1A0B4B 100%)",borderRadius:16,padding:"32px 28px",marginBottom:16,overflow:"hidden",position:"relative",width:"100%"}}>
      <div style={{position:"absolute",top:-60,right:-60,width:200,height:200,borderRadius:"50%",background:"rgba(255,255,255,.04)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:-40,left:-40,width:150,height:150,borderRadius:"50%",background:"rgba(255,255,255,.03)",pointerEvents:"none"}}/>
      <div style={{position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:"#4ADE80",animation:"pulse 2s ease infinite"}}/>
          <span style={{fontSize:11,color:"rgba(255,255,255,.6)",fontWeight:500,letterSpacing:"0.1em",textTransform:"uppercase"}}>Analyse terminée · Résultats en temps réel</span>
        </div>
        <div className="roi-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:0}}>
          <div style={{paddingRight:24,borderRight:"1px solid rgba(255,255,255,.12)"}}>
            <div style={{fontSize:10,color:"rgba(255,255,255,.5)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8,fontWeight:500}}>💰 CA récupérable</div>
            <div style={{fontSize:32,fontWeight:900,color:"#4ADE80",letterSpacing:"-0.03em",lineHeight:1}}><CountUp end={ca} suffix="€"/></div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginTop:4}}>/mois · basé sur votre score</div>
          </div>
          <div style={{padding:"0 24px",borderRight:"1px solid rgba(255,255,255,.12)"}}>
            <div style={{fontSize:10,color:"rgba(255,255,255,.5)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8,fontWeight:500}}>📈 Gain closing</div>
            <div style={{fontSize:32,fontWeight:900,color:"#60A5FA",letterSpacing:"-0.03em",lineHeight:1}}>+<CountUp end={uplift} suffix="%"/></div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginTop:4}}>vs. moyenne équipe</div>
          </div>
          <div style={{paddingLeft:24}}>
            <div style={{fontSize:10,color:"rgba(255,255,255,.5)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8,fontWeight:500}}>⏱ Rentabilité</div>
            <div style={{fontSize:32,fontWeight:900,color:"#FBBF24",letterSpacing:"-0.03em",lineHeight:1}}><CountUp end={days} suffix=" j"/></div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginTop:4}}>retour sur investissement</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertBadge({prob}){
  const hot=prob>=70;
  return(
    <div className="a2 card-flat" style={{padding:"14px 18px",display:"flex",alignItems:"center",gap:14,marginBottom:16,borderColor:hot?C.greenB:C.redB,background:hot?C.greenL:C.redL,width:"100%"}}>
      <div style={{width:36,height:36,borderRadius:9,background:hot?"#DCFCE7":"#FEE2E2",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{hot?"🔥":"⚠️"}</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:13,fontWeight:600,color:hot?C.green:C.red,marginBottom:2}}>{hot?`Deal chaud — ${prob}% de probabilité de closing`:"Risque élevé de perte — action requise"}</div>
        <div style={{fontSize:11,color:hot?"#065F46":"#991B1B"}}>{hot?"Relance dans les 24h recommandée · Priorité haute":"Retravailler les objections avant la prochaine interaction"}</div>
      </div>
      <div style={{flexShrink:0,background:hot?"#DCFCE7":"#FEE2E2",border:`1px solid ${hot?C.greenB:C.redB}`,color:hot?C.green:C.red,fontSize:11,padding:"5px 12px",borderRadius:20,fontWeight:600}}>{hot?"Deal chaud":"À risque"}</div>
    </div>
  );
}

function ScoreSection({analyse}){
  const sc=(v,m=10)=>v/m>=.7?C.green:v/m>=.5?"#D97706":C.red;
  return(
    <div className="grid-3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16,width:"100%"}}>
      {/* Score */}
      <div className="card" style={{padding:"20px"}}>
        <div style={{fontSize:10,color:C.ink3,letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600,marginBottom:12}}>Performance</div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
          <div>
            <div style={{fontSize:36,fontWeight:900,color:sc(analyse.score),letterSpacing:"-0.03em",lineHeight:1}}>{analyse.score}<span style={{fontSize:14,color:C.ink4,fontWeight:400}}>/10</span></div>
            <div style={{fontSize:11,fontWeight:600,color:"#D97706",marginTop:4}}>+{Math.round(analyse.score*1.4)}K€ potentiel</div>
          </div>
          <ScoreRing v={analyse.score} max={10} color={sc(analyse.score)}/>
        </div>
        <ProgressBar v={analyse.score} max={10} color={sc(analyse.score)}/>
        <div style={{fontSize:11,color:C.ink3,marginTop:8,lineHeight:1.5}}>{analyse.score_justification}</div>
      </div>
      {/* Closing */}
      <div className="card" style={{padding:"20px"}}>
        <div style={{fontSize:10,color:C.ink3,letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600,marginBottom:12}}>Probabilité closing</div>
        <div style={{fontSize:36,fontWeight:900,color:sc(analyse.probabilite_closing,100),letterSpacing:"-0.03em",lineHeight:1,marginBottom:4}}>{analyse.probabilite_closing}<span style={{fontSize:14,color:C.ink4,fontWeight:400}}>%</span></div>
        <div style={{fontSize:11,fontWeight:600,color:C.green,marginBottom:10}}>{Math.round(analyse.probabilite_closing*85)}€ récupérables</div>
        <ProgressBar v={analyse.probabilite_closing} max={100} color={sc(analyse.probabilite_closing,100)}/>
        <div style={{fontSize:11,color:C.ink3,marginTop:8,lineHeight:1.5}}>{analyse.proba_justification}</div>
      </div>
      {/* Objections */}
      <div className="card" style={{padding:"20px"}}>
        <div style={{fontSize:10,color:C.ink3,letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600,marginBottom:12}}>Deals à risque</div>
        <div style={{fontSize:36,fontWeight:900,color:"#D97706",letterSpacing:"-0.03em",lineHeight:1,marginBottom:4}}>{(analyse.objections||[]).length}<span style={{fontSize:14,color:C.ink4,fontWeight:400}}> objections</span></div>
        <div style={{fontSize:11,fontWeight:600,color:C.red,marginBottom:10}}>-{Math.round((analyse.objections||[]).length*8)}K€ si non traitées</div>
        <div>
          {(analyse.objections||[]).slice(0,3).map((o,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
              <div style={{width:5,height:5,borderRadius:"50%",background:C.red,flexShrink:0}}/>
              <span style={{fontSize:11,color:C.ink2}}>{o}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalysisTab({analyse}){
  return(
    <div className="ai" style={{width:"100%"}}>
      <div className="card-flat" style={{padding:"20px",marginBottom:12,width:"100%"}}>
        <div style={{fontSize:10,color:C.ink4,letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600,marginBottom:12}}>Résumé · Impact CA</div>
        <p style={{fontSize:14,color:C.ink2,lineHeight:1.85,fontWeight:400}}>{analyse.resume}</p>
      </div>
      <div className="grid-2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,width:"100%"}}>
        <div className="card-flat" style={{padding:"18px",background:C.redL,borderColor:C.redB}}>
          <div style={{fontSize:10,color:C.red,letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600,marginBottom:12}}>⚠ Freins au closing</div>
          {(analyse.objections||[]).map((o,i)=>(
            <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:10,padding:"8px 12px",background:"#FEE2E2",borderRadius:8}}>
              <span style={{fontSize:11,color:C.red,flexShrink:0,marginTop:1}}>✕</span>
              <div>
                <div style={{fontSize:12,fontWeight:500,color:C.red}}>{o}</div>
                <div style={{fontSize:10,color:"#991B1B",marginTop:1}}>-{Math.round(Math.random()*5+3)}K€ potentiels</div>
              </div>
            </div>
          ))}
        </div>
        <div className="card-flat" style={{padding:"18px",background:C.greenL,borderColor:C.greenB}}>
          <div style={{fontSize:10,color:C.green,letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600,marginBottom:12}}>✓ Leviers de performance</div>
          {(analyse.points_forts||[]).map((p,i)=>(
            <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:10,padding:"8px 12px",background:"#DCFCE7",borderRadius:8}}>
              <span style={{fontSize:11,color:C.green,flexShrink:0,marginTop:1}}>✓</span>
              <div>
                <div style={{fontSize:12,fontWeight:500,color:C.green}}>{p}</div>
                <div style={{fontSize:10,color:"#065F46",marginTop:1}}>+{Math.round(Math.random()*4+2)}K€ potentiels</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineTab({moments}){
  const impact=(d)=>{
    const l=d.toLowerCase();
    if(l.includes("objection")||l.includes("refus")||l.includes("risque"))return{color:C.red,bg:C.redL,icon:"⚠",label:"Risque",amount:`-${Math.round(Math.random()*5+3)}K€`};
    if(l.includes("accord")||l.includes("closing")||l.includes("réussi")||l.includes("planifié"))return{color:C.green,bg:C.greenL,icon:"✓",label:"Gain",amount:`+${Math.round(Math.random()*8+4)}K€`};
    return{color:"#D97706",bg:C.amberL,icon:"◆",label:"Clé",amount:null};
  };
  if(!moments?.length)return null;
  return(
    <div className="card-flat ai" style={{padding:"22px",width:"100%"}}>
      <div style={{fontSize:10,color:C.ink4,letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600,marginBottom:20}}>Moments critiques · Timeline business</div>
      <div style={{position:"relative",paddingLeft:28}}>
        <div style={{position:"absolute",left:10,top:4,bottom:4,width:2,background:"linear-gradient(to bottom,#1A0B4B,#4ADE80)",borderRadius:1}}/>
        {moments.map((m,i)=>{
          const imp=impact(m.description);
          return(
            <div key={i} style={{display:"flex",gap:14,marginBottom:20,position:"relative"}}>
              <div style={{position:"absolute",left:-28,top:2,width:20,height:20,borderRadius:"50%",background:imp.bg,border:`2px solid ${imp.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:imp.color,fontWeight:700,flexShrink:0}}>{imp.icon}</div>
              <div style={{minWidth:40,fontSize:11,color:C.ink4,fontVariantNumeric:"tabular-nums",paddingTop:2,fontWeight:600,flexShrink:0}}>{m.time}</div>
              <div style={{flex:1,minWidth:0,background:imp.bg,borderRadius:10,padding:"10px 14px",border:`1px solid ${imp.color}20`}}>
                <div style={{fontSize:12,color:C.ink,lineHeight:1.5,fontWeight:500,marginBottom:4}}>{m.description}</div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:10,color:imp.color,fontWeight:600,background:`${imp.color}20`,padding:"2px 8px",borderRadius:4}}>{imp.label}</span>
                  {imp.amount&&<span style={{fontSize:11,color:imp.color,fontWeight:700}}>{imp.amount}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EmailsTab({emails}){
  const [t,setT]=useState(0);
  const [cp,setCp]=useState(false);
  const tabs=[{l:"J+1 · Suivi immédiat",c:C.green},{l:"J+3 · Nurturing",c:"#D97706"},{l:"J+7 · Closing final",c:C.navy}];
  if(!emails?.length)return null;
  const copy=()=>{navigator.clipboard.writeText(`Objet: ${emails[t]?.sujet}\n\n${emails[t]?.corps}`);setCp(true);setTimeout(()=>setCp(false),2000);};
  return(
    <div className="ai" style={{width:"100%"}}>
      <div className="card-flat" style={{padding:"12px 16px",marginBottom:14,background:C.blueL,borderColor:C.blueB,display:"flex",alignItems:"flex-start",gap:10}}>
        <span style={{fontSize:16,flexShrink:0}}>💡</span>
        <span style={{fontSize:12,color:C.blue,fontWeight:500,lineHeight:1.5}}>Cette séquence est optimisée pour générer <strong>+3 à 5 RDV supplémentaires</strong> · Taux de réponse estimé : 34%</span>
      </div>
      <div style={{display:"flex",gap:6,marginBottom:14,overflowX:"auto",WebkitOverflowScrolling:"touch",paddingBottom:4}}>
        {tabs.map((tb,i)=>(
          <button key={i} onClick={()=>setT(i)} style={{
            background:t===i?tb.c:"#fff",border:`1.5px solid ${t===i?tb.c:C.b}`,
            color:t===i?"#fff":C.ink2,padding:"8px 14px",borderRadius:7,
            fontSize:11,cursor:"pointer",fontFamily:"inherit",fontWeight:t===i?600:500,
            whiteSpace:"nowrap",flexShrink:0,minHeight:36,transition:"all .15s",
          }}>{tb.l}</button>
        ))}
      </div>
      <div className="card-flat" style={{overflow:"hidden"}}>
        <div style={{padding:"14px 18px",borderBottom:`1px solid ${C.b}`,display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10,background:"#F8F8FC"}}>
          <div>
            <div style={{fontSize:10,color:C.ink4,letterSpacing:"0.1em",textTransform:"uppercase",fontWeight:600,marginBottom:4}}>Objet</div>
            <div style={{fontSize:13,fontWeight:600,color:C.ink,lineHeight:1.4}}>{emails[t]?.sujet}</div>
          </div>
          <button onClick={copy} style={{background:cp?C.greenL:"#fff",border:`1px solid ${cp?C.greenB:C.b}`,color:cp?C.green:C.ink3,fontSize:11,padding:"6px 14px",borderRadius:6,cursor:"pointer",fontFamily:"inherit",fontWeight:500,flexShrink:0,minHeight:36,transition:"all .2s"}}>
            {cp?"✓ Copié":"Copier"}
          </button>
        </div>
        <div style={{padding:"18px",fontSize:13,lineHeight:1.9,color:C.ink2,whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{emails[t]?.corps}</div>
      </div>
    </div>
  );
}

function CoachingTab({coaching,transcription}){
  return(
    <div className="ai" style={{width:"100%"}}>
      <div className="card-flat" style={{padding:"20px",marginBottom:12,background:C.navyL,borderColor:"#C4B5FD",width:"100%"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <div style={{width:32,height:32,borderRadius:8,background:C.navy,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14}}>🎓</div>
          <div style={{fontSize:10,color:C.navy,letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:700}}>Plan d'action personnalisé · IA</div>
        </div>
        <p style={{fontSize:14,color:"#3730A3",lineHeight:1.9,fontWeight:400}}>{coaching}</p>
      </div>
      <div className="card-flat" style={{padding:"18px",width:"100%"}}>
        <div style={{fontSize:10,color:C.ink4,letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600,marginBottom:12}}>Transcription analysée</div>
        <div style={{fontSize:12,color:C.ink3,lineHeight:1.8,maxHeight:200,overflow:"auto",whiteSpace:"pre-wrap",wordBreak:"break-word",background:C.bg,padding:"14px",borderRadius:8}}>{transcription}</div>
      </div>
    </div>
  );
}

function Loader(){
  const [s,setS]=useState(0);
  const steps=["Analyse de la transcription","Détection des signaux commerciaux","Calcul de l'impact financier","Génération de la séquence emails"];
  useEffect(()=>{
    const t1=setTimeout(()=>setS(1),1200);
    const t2=setTimeout(()=>setS(2),2600);
    const t3=setTimeout(()=>setS(3),4000);
    return()=>{clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);};
  },[]);
  return(
    <div style={{display:"flex",justifyContent:"center",padding:"80px 16px"}}>
      <div className="card-flat" style={{padding:"40px 36px",maxWidth:400,textAlign:"center",width:"100%"}}>
        <div style={{width:40,height:40,border:`2px solid ${C.navy}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 24px"}}/>
        <div style={{fontSize:16,fontWeight:700,color:C.ink,marginBottom:6}}>Analyse en cours</div>
        <div style={{fontSize:13,color:C.ink3,marginBottom:28}}>Calcul de l'impact sur votre CA</div>
        <div style={{display:"flex",flexDirection:"column",gap:8,textAlign:"left"}}>
          {steps.map((st,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:i<=s?C.navyL:"#F8F8FC",border:`1px solid ${i<=s?"#C4B5FD":C.b}`,borderRadius:8,transition:"all .4s"}}>
              <div style={{width:18,height:18,borderRadius:"50%",background:i<s?C.green:i===s?C.navy:"#E8E8EE",border:`2px solid ${i<s?C.green:i===s?C.navy:C.b}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                {i<s&&<svg width="8" height="8" viewBox="0 0 8 8"><polyline points="1,4 3,6 7,2" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                {i===s&&<div style={{width:5,height:5,borderRadius:"50%",background:"#fff",animation:"pulse 1s ease infinite"}}/>}
              </div>
              <span style={{fontSize:12,color:i<=s?C.navy:C.ink3,fontWeight:i<=s?600:400,transition:"all .4s"}}>{st}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PricingPage({onBack}){
  const [faq,setFaq]=useState(null);
  const isMobile=useIsMobile();
  const plans=[
    {
      id:"starter",name:"Starter",price:"2 000",monthly:"49",
      desc:"Pour les entrepreneurs et indépendants",
      accent:C.ink3,border:C.b,bg:C.white,
      features:["1 utilisateur","50 analyses / mois","Score et objections","Emails de relance","Dashboard basique","Support email"],
      cta:"Commencer",highlight:false,
    },
    {
      id:"pro",name:"Pro",price:"5 000",monthly:"99",
      desc:"Pour les équipes commerciales performantes",
      accent:C.navy,border:C.navy,bg:C.white,
      badge:"⭐ Recommandé",roi:"Récupérez jusqu'à 40 000€/mois",
      features:["Jusqu'à 10 commerciaux","Analyses illimitées","Détection objections IA","Calcul ROI automatique","Dashboard équipe","Recommandations IA","Timeline des appels","Emails de relance","Support prioritaire"],
      cta:"Démarrer maintenant",highlight:true,
    },
    {
      id:"agency",name:"Agency",price:"12 000",monthly:"299",
      desc:"Pour les agences et revendeurs",
      accent:"#92400E",border:"#FDE68A",bg:C.amberL,
      features:["Utilisateurs illimités","Multi-équipes","White label complet","Accès API","Intégration CRM","Manager dédié","Support 24/7","Formation incluse"],
      cta:"Nous contacter",highlight:false,
    },
  ];
  const faqs=[
    {q:"Combien de temps pour la mise en place ?",a:"Moins d'une semaine. Notre équipe vous accompagne de A à Z pour configurer l'outil et former vos commerciaux."},
    {q:"Quel est le ROI moyen constaté ?",a:"Nos clients récupèrent en moyenne 20 000 à 50 000€ de CA par mois. Le retour sur investissement est généralement atteint en 4 à 7 jours."},
    {q:"Compatible avec mon CRM existant ?",a:"Oui. SalesCoach AI s'intègre avec HubSpot, Salesforce, Pipedrive et tous les CRM majeurs."},
    {q:"Pourquoi une licence unique ?",a:"Vous payez une fois et possédez l'outil pour toujours. La maintenance mensuelle couvre uniquement les mises à jour et le support."},
  ];
  return(
    <div className="pad" style={{maxWidth:960,margin:"0 auto",padding:"52px 20px",width:"100%"}}>
      <div className="a1" style={{textAlign:"center",marginBottom:52}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:C.navyL,border:`1px solid #C4B5FD`,borderRadius:20,padding:"5px 16px",marginBottom:18}}>
          <span style={{width:5,height:5,borderRadius:"50%",background:C.navy}}/>
          <span style={{fontSize:11,color:C.navy,fontWeight:600,letterSpacing:"0.08em"}}>PRICING</span>
        </div>
        <h1 className="pricing-h" style={{fontSize:36,fontWeight:900,lineHeight:1.1,letterSpacing:"-0.03em",marginBottom:14,color:C.ink}}>
          Choisissez le plan qui va transformer<br/>
          <span style={{color:C.navy}}>votre chiffre d'affaires</span>
        </h1>
        <p style={{fontSize:14,color:C.ink3,maxWidth:480,margin:"0 auto",lineHeight:1.7}}>
          Récupérez jusqu'à <strong style={{color:C.green}}>50 000€/mois</strong> perdus dans vos ventes grâce à l'analyse IA
        </p>
      </div>

      <div className="plan-grid a2" style={{display:"grid",gridTemplateColumns:"1fr 1.08fr 1fr",gap:14,marginBottom:48}}>
        {(isMobile?[plans[1],plans[0],plans[2]]:plans).map(plan=>(
          <div key={plan.id} style={{
            background:plan.bg,border:`1.5px solid ${plan.border}`,borderRadius:16,
            padding:plan.highlight?"30px 22px":"22px 18px",
            boxShadow:plan.highlight?"0 8px 40px rgba(26,11,75,.15)":"0 2px 8px rgba(0,0,0,.04)",
            position:"relative",width:"100%",
          }}>
            {plan.badge&&(
              <div style={{background:C.navy,color:"#fff",fontSize:11,padding:"5px 16px",borderRadius:20,fontWeight:700,textAlign:"center",marginBottom:16,boxShadow:"0 4px 16px rgba(26,11,75,.3)"}}>{plan.badge}</div>
            )}
            {plan.roi&&(
              <div style={{background:C.greenL,border:`1px solid ${C.greenB}`,borderRadius:8,padding:"8px 12px",marginBottom:16,textAlign:"center"}}>
                <span style={{fontSize:11,color:C.green,fontWeight:600}}>💰 {plan.roi}</span>
              </div>
            )}
            <div style={{marginBottom:18}}>
              <div style={{fontSize:10,color:C.ink4,letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600,marginBottom:6}}>{plan.name}</div>
              <div style={{display:"flex",alignItems:"baseline",gap:4,marginBottom:4,flexWrap:"wrap"}}>
                <span style={{fontSize:34,fontWeight:900,color:plan.highlight?C.navy:C.ink,letterSpacing:"-0.02em"}}>{plan.price}€</span>
              </div>
              <div style={{fontSize:12,color:C.ink3,marginBottom:6}}>+ {plan.monthly}€/mois maintenance</div>
              <div style={{fontSize:12,color:C.ink2,lineHeight:1.4}}>{plan.desc}</div>
            </div>
            <div style={{height:1,background:C.b,marginBottom:16}}/>
            <div style={{marginBottom:20}}>
              {plan.features.map((f,i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:9}}>
                  <div style={{width:16,height:16,borderRadius:"50%",background:plan.highlight?C.navyL:C.greenL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                    <svg width="7" height="7" viewBox="0 0 8 8"><polyline points="1,4 3,6 7,2" fill="none" stroke={plan.highlight?C.navy:C.green} strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                  <span style={{fontSize:12,color:C.ink2,lineHeight:1.4}}>{f}</span>
                </div>
              ))}
            </div>
            <button className={plan.highlight?"btn-primary full-sm":"btn-secondary full-sm"} style={{
              width:"100%",minHeight:48,fontSize:13,borderRadius:9,
              background:plan.id==="agency"?`linear-gradient(135deg,#92400E,#D97706)`:undefined,
              border:plan.id==="agency"?"none":undefined,
              color:plan.id==="agency"?"#fff":undefined,
              boxShadow:plan.id==="agency"?"0 4px 16px rgba(217,119,6,.3)":undefined,
            }}>{plan.cta} →</button>
          </div>
        ))}
      </div>

      {/* ROI */}
      <div className="a3 card-flat" style={{padding:"28px 24px",marginBottom:28,background:C.greenL,borderColor:C.greenB,width:"100%"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:10,color:C.green,letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:700,marginBottom:6}}>Calculateur ROI</div>
          <div style={{fontSize:22,fontWeight:800,color:C.ink,letterSpacing:"-0.02em"}}>Votre situation actuelle</div>
        </div>
        <div className="roi-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:20}}>
          {[{l:"Deals / mois",v:"20",c:C.ink},{l:"% perdus",v:"30%",c:C.red},{l:"Ticket moyen",v:"5 000€",c:C.ink},{l:"CA perdu / mois",v:"30 000€",c:C.red}].map((item,i)=>(
            <div key={i} style={{textAlign:"center",padding:"14px 10px",background:"#DCFCE7",borderRadius:10,border:`1px solid ${C.greenB}`}}>
              <div style={{fontSize:9,color:"#065F46",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6,fontWeight:600}}>{item.l}</div>
              <div style={{fontSize:18,fontWeight:800,color:item.c}}>{item.v}</div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",padding:"14px",background:"#DCFCE7",border:`1px solid ${C.greenB}`,borderRadius:10}}>
          <div style={{fontSize:14,fontWeight:700,color:C.green,marginBottom:4}}>✅ Rentabilité en 4 à 7 jours</div>
          <div style={{fontSize:12,color:"#065F46"}}>5 000€ de licence · 30 000€/mois récupérables</div>
        </div>
      </div>

      {/* Garantie */}
      <div className="a4 card-flat stack-sm" style={{padding:"22px 24px",marginBottom:28,display:"flex",alignItems:"center",gap:16,borderColor:C.greenB,background:C.greenL,width:"100%"}}>
        <div style={{fontSize:40,flexShrink:0}}>🛡️</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:16,fontWeight:700,marginBottom:4,color:C.ink}}>Garantie satisfait ou remboursé 7 jours</div>
          <div style={{fontSize:13,color:C.ink2,lineHeight:1.6}}>Pas de résultat visible dans les 7 premiers jours ? On vous rembourse intégralement, sans question.</div>
        </div>
        <div style={{flexShrink:0,background:"#DCFCE7",border:`1px solid ${C.greenB}`,color:C.green,fontSize:11,padding:"8px 16px",borderRadius:20,fontWeight:700,whiteSpace:"nowrap"}}>✓ Garanti</div>
      </div>

      {/* FAQ */}
      <div className="a5">
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:22,fontWeight:800,color:C.ink,letterSpacing:"-0.02em",marginBottom:6}}>Questions fréquentes</div>
          <div style={{fontSize:13,color:C.ink3}}>Tout ce que vous devez savoir avant de démarrer</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {faqs.map((item,i)=>(
            <div key={i} className="card-flat" style={{overflow:"hidden",cursor:"pointer",transition:"border-color .2s",borderColor:faq===i?C.navy:C.b}} onClick={()=>setFaq(faq===i?null:i)}>
              <div style={{padding:"16px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
                <span style={{fontSize:13,fontWeight:600,color:faq===i?C.navy:C.ink,flex:1,lineHeight:1.4}}>{item.q}</span>
                <span style={{fontSize:18,color:C.ink4,flexShrink:0,transition:"transform .2s",display:"inline-block",transform:faq===i?"rotate(45deg)":"rotate(0)"}}>+</span>
              </div>
              {faq===i&&<div style={{padding:"0 18px 16px",paddingTop:0,borderTop:`1px solid ${C.b}`,paddingTop:12,fontSize:13,color:C.ink2,lineHeight:1.7,marginTop:0}}>{item.a}</div>}
            </div>
          ))}
        </div>
      </div>

      <div style={{textAlign:"center",marginTop:40}}>
        <button onClick={onBack} className="btn-secondary full-sm" style={{minHeight:44,maxWidth:280,width:"100%"}}>← Retour à l'analyse</button>
      </div>
    </div>
  );
}

function App(){
  const [ph,setPh]=useState("idle");
  const [tx,setTx]=useState("");
  const [res,setRes]=useState(null);
  const [err,setErr]=useState("");
  const [ab,setAb]=useState(null);
  const [tab,setTab]=useState("analyse");
  const [drag,setDrag]=useState(false);
  const [page,setPage]=useState("app");
  const fr=useRef(null);

  const onFile=e=>{const f=e.target.files[0];if(f)setAb(f);};
  const onDrop=e=>{e.preventDefault();setDrag(false);const f=e.dataTransfer.files[0];if(f?.type.startsWith("audio/"))setAb(f);};

  const analyze=async()=>{
    setPh("processing");
    try{
      const{transcription}=await fetch("/api/transcribe",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({transcription:tx||""})}).then(r=>r.json());
      const analyse=await fetch("/api/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({transcription})}).then(r=>r.json());
      const email=await fetch("/api/email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({transcription,analyse})}).then(r=>r.json());
      setRes({transcription,analyse,email});
      setPh("done");setTab("analyse");
    }catch(e){setErr("Erreur de connexion. Réessayez.");setPh("err");}
  };

  const reset=()=>{setPh("idle");setRes(null);setTx("");setAb(null);setErr("");};

  const TABS=[{id:"analyse",l:"Impact CA"},{id:"timeline",l:"Timeline"},{id:"emails",l:"Emails"},{id:"coaching",l:"Coaching"}];

  return(
    <div style={{minHeight:"100vh",background:C.bg,width:"100%",overflowX:"hidden"}}>
      <style>{KF}</style>

      {/* Nav */}
      <nav style={{height:56,borderBottom:`1px solid ${C.b}`,padding:"0 20px",display:"flex",alignItems:"center",gap:8,background:C.white,position:"sticky",top:0,zIndex:20,width:"100%"}}>
        <div style={{width:28,height:28,borderRadius:7,background:C.navy,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        </div>
        <span style={{fontSize:14,fontWeight:700,letterSpacing:"-0.01em",color:C.ink}}>SalesCoach</span>
        <span style={{fontSize:9,background:C.navyL,border:`1px solid #C4B5FD`,color:C.navy,padding:"2px 7px",borderRadius:4,fontWeight:700,letterSpacing:"0.06em"}}>PRO</span>
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:8}}>
          <div style={{display:"flex",alignItems:"center",gap:5,fontSize:11,color:C.ink4}}>
            <div style={{width:5,height:5,borderRadius:"50%",background:C.green,animation:"pulse 2s ease infinite"}}/>
            <span className="hide-sm">IA active</span>
          </div>
          <button onClick={()=>setPage(page==="pricing"?"app":"pricing")} className="btn-secondary" style={{fontSize:11,padding:"6px 12px",borderRadius:6,minHeight:34,border:`1px solid ${C.b}`,color:C.ink2}}>
            {page==="pricing"?"← Analyser":"💰 Pricing"}
          </button>
          {ph!=="idle"&&ph!=="err"&&page==="app"&&<button onClick={reset} className="btn-secondary" style={{fontSize:11,padding:"6px 12px",borderRadius:6,minHeight:34,border:`1px solid ${C.b}`,color:C.ink2}}>← Nouveau</button>}
        </div>
      </nav>

      {page==="pricing"?(
        <PricingPage onBack={()=>setPage("app")}/>
      ):(
        <div className="pad" style={{maxWidth:940,margin:"0 auto",padding:"36px 16px",width:"100%"}}>

          {ph==="idle"&&(
            <div>
              {/* Trust bar */}
              <div className="a1" style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",background:C.white,border:`1px solid ${C.b}`,borderRadius:10,marginBottom:28,flexWrap:"wrap",gap:8}}>
                <div style={{width:5,height:5,borderRadius:"50%",background:C.green,animation:"pulse 2s ease infinite",flexShrink:0}}/>
                <span style={{fontSize:11,color:C.ink3,fontWeight:500}}>Utilisé par des équipes commerciales performantes</span>
                <div style={{marginLeft:"auto",display:"flex",gap:12,flexWrap:"wrap"}}>
                  {["🔒 Données sécurisées","⚡ Résultats en 30s","💰 ROI garanti"].map((b,i)=>(
                    <span key={i} style={{fontSize:10,color:C.ink3,fontWeight:500,display:"flex",alignItems:"center",gap:4}}>{b}</span>
                  ))}
                </div>
              </div>

              <div className="a2" style={{marginBottom:40}}>
                <h1 className="hero-title" style={{fontSize:38,fontWeight:900,lineHeight:1.1,letterSpacing:"-0.03em",color:C.ink,marginBottom:14}}>
                  Transformez chaque appel<br/>
                  <span style={{color:C.navy}}>en chiffre d'affaires.</span>
                </h1>
                <p className="hero-sub" style={{fontSize:15,color:C.ink3,lineHeight:1.7,maxWidth:500,fontWeight:400}}>
                  Identifiez les deals à risque, récupérez les opportunités manquées et augmentez votre taux de closing — en 30 secondes.
                </p>
              </div>

              {/* KPI row */}
              <div className="a3 grid-4" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:28}}>
                <KPICard icon="💰" label="CA récupérable" value="48K€/mois" sub="moyenne clients" trend={27}/>
                <KPICard icon="📈" label="Gain closing" value="+27%" sub="vs. avant outil"/>
                <KPICard icon="⚡" label="Rentabilité" value="4 jours" sub="retour investissement"/>
                <KPICard icon="🎯" label="Précision IA" value="94%" sub="score de fiabilité"/>
              </div>

              {/* Input zone */}
              <div className="a4 grid-2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
                <div className="card" style={{padding:"24px 20px",cursor:"pointer",textAlign:"center",border:`1.5px dashed ${drag?C.navy:ab?"#A7F3D0":C.bm}`,background:drag?C.navyL:ab?C.greenL:C.white,minHeight:140,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8}}
                  onClick={()=>fr.current?.click()}
                  onDragOver={e=>{e.preventDefault();setDrag(true);}}
                  onDragLeave={()=>setDrag(false)}
                  onDrop={onDrop}
                >
                  <div style={{width:40,height:40,borderRadius:10,background:ab?C.greenL:C.navyL,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ab?C.green:C.navy} strokeWidth="1.8"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  </div>
                  <div style={{fontSize:13,fontWei
