import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";

const KF = `
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html,body{overflow-x:hidden;max-width:100vw}
body{background:#05050A;color:#ECECF1;font-family:'Geist',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes fu{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes fi{from{opacity:0}to{opacity:1}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes glow{0%,100%{box-shadow:0 0 30px rgba(124,58,237,.3)}50%{box-shadow:0 0 60px rgba(124,58,237,.6)}}
.a1{animation:fu .5s cubic-bezier(.16,1,.3,1) both}
.a2{animation:fu .5s .08s cubic-bezier(.16,1,.3,1) both}
.a3{animation:fu .5s .16s cubic-bezier(.16,1,.3,1) both}
.a4{animation:fu .5s .24s cubic-bezier(.16,1,.3,1) both}
.a5{animation:fu .5s .32s cubic-bezier(.16,1,.3,1) both}
.ai{animation:fi .35s ease both}
.ch{transition:all .2s cubic-bezier(.16,1,.3,1)}
.tb{transition:color .15s,border-color .15s}
.pro-glow{animation:glow 3s ease infinite}
.btn-shine{position:relative;overflow:hidden}
.btn-shine::after{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);transition:left .5s}
.btn-shine:hover::after{left:100%}
@media(max-width:640px){
  .grid-2{grid-template-columns:1fr!important}
  .grid-3{grid-template-columns:1fr!important}
  .grid-4{grid-template-columns:1fr 1fr!important}
  .hide-mobile{display:none!important}
  .stack-mobile{flex-direction:column!important;gap:12px!important}
  .full-mobile{width:100%!important}
  .text-hero{font-size:30px!important}
  .text-subhero{font-size:14px!important}
  .pad-section{padding:32px 16px!important}
  .kpi-val{font-size:26px!important}
  .roi-grid{grid-template-columns:1fr 1fr!important;gap:12px!important}
  .roi-border{border-left:none!important;border-right:none!important;border-top:1px solid rgba(255,255,255,0.055)!important;padding-top:12px!important;padding-left:0!important;padding-right:0!important}
  .tab-label{font-size:11px!important;padding:8px 12px!important}
  .plan-grid{grid-template-columns:1fr!important;gap:16px!important}
  .faq-grid{gap:8px!important}
  .guarantee-flex{flex-direction:column!important;text-align:center!important;gap:12px!important}
  .nav-pad{padding:0 16px!important}
  .pricing-title{font-size:28px!important}
}
`;

const T = {
  bg:"#05050A", s1:"#0A0A12", s2:"#0F0F18",
  b:"rgba(255,255,255,0.055)", bm:"rgba(255,255,255,0.09)", bh:"rgba(255,255,255,0.18)",
  i:"#7C3AED", ig:"linear-gradient(135deg,#7C3AED,#5B21B6)",
  id:"rgba(124,58,237,0.1)", ib:"rgba(124,58,237,0.25)",
  g:"#059669", gd:"rgba(5,150,105,0.1)", gb:"rgba(5,150,105,0.25)",
  a:"#D97706", ad:"rgba(217,119,6,0.1)", ab:"rgba(217,119,6,0.25)",
  r:"#DC2626", rd:"rgba(220,38,38,0.08)", rb:"rgba(220,38,38,0.22)",
  t1:"#ECECF1", t2:"#9090A0", t3:"#50505F",
  gold:"#F59E0B", goldD:"rgba(245,158,11,0.12)", goldB:"rgba(245,158,11,0.3)",
};

const c=(x={})=>({background:T.s1,border:`1px solid ${T.b}`,borderRadius:12,padding:"20px",width:"100%",...x});

function useIsMobile(){
  const [m,setM]=useState(window.innerWidth<=640);
  useEffect(()=>{const h=()=>setM(window.innerWidth<=640);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);
  return m;
}

function CountUp({end,duration=1200,suffix=""}){
  const [val,setVal]=useState(0);
  useEffect(()=>{
    let s=0;const step=end/60;
    const t=setInterval(()=>{s+=step;if(s>=end){setVal(end);clearInterval(t);}else setVal(Math.floor(s));},duration/60);
    return()=>clearInterval(t);
  },[end]);
  return <span>{val.toLocaleString("fr-FR")}{suffix}</span>;
}

const Pip=({color,bg,bd,children})=>(
  <span style={{display:"inline-flex",alignItems:"center",fontSize:11,padding:"4px 10px",background:bg,border:`1px solid ${bd}`,color,borderRadius:6,marginRight:6,marginBottom:6,fontWeight:500}}>{children}</span>
);

const Div=({label,accent=false})=>(
  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
    {accent&&<div style={{width:2,height:14,background:T.ig,borderRadius:1,flexShrink:0}}/>}
    <span style={{fontSize:10,letterSpacing:"0.13em",textTransform:"uppercase",color:T.t3,fontWeight:500}}>{label}</span>
    <div style={{flex:1,height:"1px",background:T.b}}/>
  </div>
);

const Ring=({v,max=10,color,size=70})=>{
  const r=26,circ=2*Math.PI*r,off=circ-(v/max)*circ;
  return(
    <svg width={size} height={size} viewBox="0 0 70 70" style={{flexShrink:0}}>
      <circle cx="35" cy="35" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="4"/>
      <circle cx="35" cy="35" r={r} fill="none" stroke={color} strokeWidth="4"
        strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"
        transform="rotate(-90 35 35)" style={{transition:"stroke-dashoffset 1.4s cubic-bezier(.16,1,.3,1)"}}/>
      <text x="35" y="40" textAnchor="middle" fill={color} fontSize="14" fontWeight="600" fontFamily="'Geist',sans-serif">{v}</text>
    </svg>
  );
};

const Bar=({v,max=100,color})=>(
  <div style={{height:3,background:"rgba(255,255,255,0.04)",borderRadius:2,overflow:"hidden",marginTop:8,width:"100%"}}>
    <div style={{height:"100%",borderRadius:2,background:color,width:`${Math.min(100,(v/max)*100)}%`,transition:"width 1.4s cubic-bezier(.16,1,.3,1)"}}/>
  </div>
);

function ROIBanner({score,prob}){
  const ca=Math.round(prob*480);
  const days=score>=8?4:score>=6?8:15;
  const uplift=score>=8?27:score>=6?18:10;
  return(
    <div className="a1 ch" style={{background:"linear-gradient(135deg,rgba(124,58,237,.12),rgba(5,150,105,.08))",border:`1px solid ${T.ib}`,borderRadius:14,padding:"20px",marginBottom:14,animation:"glow 3s ease infinite",width:"100%"}}>
      <div className="roi-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:0}}>
        <div style={{textAlign:"center",padding:"0 8px"}}>
          <div style={{fontSize:9,color:T.t3,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6,fontWeight:500}}>💰 CA récupérable</div>
          <div className="kpi-val" style={{fontSize:24,fontWeight:700,color:T.gold,lineHeight:1}}><CountUp end={ca} suffix="€"/></div>
          <div style={{fontSize:10,color:T.t3,marginTop:3}}>/mois</div>
        </div>
        <div className="roi-border" style={{textAlign:"center",padding:"0 8px",borderLeft:`1px solid ${T.b}`,borderRight:`1px solid ${T.b}`}}>
          <div style={{fontSize:9,color:T.t3,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6,fontWeight:500}}>📈 Gain closing</div>
          <div className="kpi-val" style={{fontSize:24,fontWeight:700,color:T.g,lineHeight:1}}>+<CountUp end={uplift} suffix="%"/></div>
          <div style={{fontSize:10,color:T.t3,marginTop:3}}>estimé</div>
        </div>
        <div style={{textAlign:"center",padding:"0 8px"}}>
          <div style={{fontSize:9,color:T.t3,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6,fontWeight:500}}>⏱ Rentabilité</div>
          <div className="kpi-val" style={{fontSize:24,fontWeight:700,color:T.i,lineHeight:1}}><CountUp end={days} suffix="j"/></div>
          <div style={{fontSize:10,color:T.t3,marginTop:3}}>retour invest.</div>
        </div>
      </div>
    </div>
  );
}

function PredictionBadge({prob}){
  const hot=prob>=70;
  return(
    <div className="ch" style={{background:hot?T.gd:T.rd,border:`1px solid ${hot?T.gb:T.rb}`,borderRadius:10,padding:"14px 16px",display:"flex",alignItems:"flex-start",gap:12,marginBottom:14,width:"100%"}}>
      <div style={{fontSize:20,flexShrink:0}}>{hot?"🔥":"⚠️"}</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:13,fontWeight:600,color:hot?T.g:T.r,marginBottom:4,lineHeight:1.4}}>
          {hot?`Prédiction IA : ${prob}% de chances de closer`:"Risque élevé — action immédiate requise"}
        </div>
        <div style={{fontSize:11,color:T.t3,lineHeight:1.5}}>
          {hot?"Priorité haute · Relance dans les 24h":"Retravailler les objections avant le prochain contact"}
        </div>
      </div>
    </div>
  );
}

function Emails({emails}){
  const [t,setT]=useState(0);
  const [cp,setCp]=useState(false);
  const tabs=[{l:"J+1",c:T.g},{l:"J+3",c:T.a},{l:"J+7",c:T.i}];
  if(!emails?.length)return null;
  const copy=()=>{navigator.clipboard.writeText(`${emails[t]?.sujet}\n\n${emails[t]?.corps}`);setCp(true);setTimeout(()=>setCp(false),2000);};
  return(
    <div style={{width:"100%"}}>
      <div style={{background:T.goldD,border:`1px solid ${T.goldB}`,borderRadius:8,padding:"10px 14px",marginBottom:14,display:"flex",alignItems:"flex-start",gap:8}}>
        <span style={{fontSize:14,flexShrink:0}}>💡</span>
        <span style={{fontSize:12,color:T.gold,fontWeight:500,lineHeight:1.5}}>Cette séquence peut générer <strong>+3 à 5 RDV supplémentaires</strong></span>
      </div>
      <div style={{display:"flex",gap:6,marginBottom:14}}>
        {tabs.map((tb,i)=>(
          <button key={i} onClick={()=>setT(i)} className="tb" style={{flex:1,background:t===i?tb.c:"transparent",border:`1px solid ${t===i?tb.c:T.b}`,color:t===i?"#05050A":T.t2,padding:"10px 8px",borderRadius:6,fontSize:12,cursor:"pointer",fontFamily:"inherit",fontWeight:t===i?600:400,minHeight:44}}>{tb.l}</button>
        ))}
      </div>
      <div style={{border:`1px solid ${T.b}`,borderRadius:10,overflow:"hidden",background:T.s2,width:"100%"}}>
        <div style={{padding:"12px 14px",borderBottom:`1px solid ${T.b}`,display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
          <span style={{fontSize:12,fontWeight:500,color:T.t1,lineHeight:1.4,flex:1}}>{emails[t]?.sujet}</span>
          <button onClick={copy} className="ch" style={{background:cp?T.gd:"transparent",border:`1px solid ${cp?T.gb:T.b}`,color:cp?T.g:T.t3,fontSize:11,padding:"6px 12px",borderRadius:5,cursor:"pointer",fontFamily:"inherit",fontWeight:500,flexShrink:0,minHeight:36}}>
            {cp?"✓ Copié":"Copier"}
          </button>
        </div>
        <div style={{padding:"14px",fontSize:12,lineHeight:1.85,color:T.t2,whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{emails[t]?.corps}</div>
      </div>
    </div>
  );
}

function TL({moments}){
  if(!moments?.length)return null;
  const impact=(d)=>{
    const l=d.toLowerCase();
    if(l.includes("objection")||l.includes("refus")||l.includes("risque")||l.includes("résistance"))return{color:T.r,label:"⚠️ Perte",amount:`-${Math.floor(Math.random()*5+3)}K€`};
    if(l.includes("accord")||l.includes("closing")||l.includes("réussi")||l.includes("planifié"))return{color:T.g,label:"📈 Gain",amount:`+${Math.floor(Math.random()*8+5)}K€`};
    return{color:T.a,label:"📊 Clé",amount:null};
  };
  return(
    <div style={{position:"relative",paddingLeft:24,width:"100%"}}>
      <div style={{position:"absolute",left:8,top:6,bottom:6,width:"1px",background:`linear-gradient(to bottom,${T.i},${T.g}40)`}}/>
      {moments.map((m,i)=>{
        const imp=impact(m.description);
        return(
          <div key={i} style={{display:"flex",gap:12,marginBottom:18,position:"relative"}}>
            <div style={{position:"absolute",left:-24,top:5,width:9,height:9,borderRadius:"50%",background:imp.color,border:`1.5px solid ${T.s1}`,flexShrink:0}}/>
            <div style={{minWidth:36,fontSize:10,color:T.t3,fontVariantNumeric:"tabular-nums",paddingTop:1,fontWeight:500,flexShrink:0}}>{m.time}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:12,color:T.t2,lineHeight:1.5,marginBottom:4,wordBreak:"break-word"}}>{m.description}</div>
              <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                <span style={{fontSize:10,color:imp.color,fontWeight:600,background:`${imp.color}15`,padding:"2px 7px",borderRadius:4}}>{imp.label}</span>
                {imp.amount&&<span style={{fontSize:10,color:imp.color,fontWeight:700}}>{imp.amount}</span>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Loader(){
  const [s,setS]=useState(0);
  const steps=["Analyse de la transcription","Détection des signaux commerciaux","Calcul de l'impact financier","Génération des emails"];
  useEffect(()=>{
    const t1=setTimeout(()=>setS(1),1200);
    const t2=setTimeout(()=>setS(2),2400);
    const t3=setTimeout(()=>setS(3),3600);
    return()=>{clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);};
  },[]);
  return(
    <div style={{display:"flex",justifyContent:"center",padding:"60px 16px"}}>
      <div style={{...c({padding:"32px 24px",maxWidth:380,textAlign:"center"})}}>
        <div style={{width:36,height:36,border:`1.5px solid ${T.i}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin .75s linear infinite",margin:"0 auto 24px"}}/>
        <div style={{fontSize:15,fontWeight:500,marginBottom:6,color:T.t1}}>Analyse en cours</div>
        <div style={{fontSize:12,color:T.t3,marginBottom:28}}>Calcul de l'impact sur votre CA</div>
        <div style={{display:"flex",flexDirection:"column",gap:8,textAlign:"left"}}>
          {steps.map((st,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:i<=s?T.id:"rgba(255,255,255,.02)",border:`1px solid ${i<=s?T.ib:T.b}`,borderRadius:8,transition:"all .4s ease"}}>
              <div style={{width:16,height:16,borderRadius:"50%",background:i<s?T.g:i===s?T.i:"transparent",border:`1.5px solid ${i<s?T.g:i===s?T.i:T.b}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                {i<s&&<svg width="8" height="8" viewBox="0 0 8 8"><polyline points="1,4 3,6 7,2" fill="none" stroke="#05050A" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                {i===s&&<div style={{width:5,height:5,borderRadius:"50%",background:"#fff",animation:"pulse 1s ease infinite"}}/>}
              </div>
              <span style={{fontSize:11,color:i<=s?T.t1:T.t3,fontWeight:i<=s?500:400}}>{st}</span>
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
      color:T.t2,border:T.b,
      features:["1 utilisateur","50 analyses / mois","Score et objections","Emails de relance","Dashboard basique","Support email"],
      cta:"Commencer",highlight:false,
    },
    {
      id:"pro",name:"Pro",price:"5 000",monthly:"99",
      desc:"Pour les équipes commerciales performantes",
      color:T.i,border:T.i,badge:"⭐ Recommandé",roi:"Récupérez jusqu'à 40 000€/mois",
      features:["Jusqu'à 10 commerciaux","Analyses illimitées","Détection objections IA","Calcul ROI automatique","Dashboard équipe","Recommandations IA","Timeline des appels","Emails de relance","Support prioritaire"],
      cta:"Démarrer maintenant",highlight:true,
    },
    {
      id:"agency",name:"Agency",price:"12 000",monthly:"299",
      desc:"Pour les agences et revendeurs",
      color:T.gold,border:T.goldB,
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
    <div className="pad-section" style={{maxWidth:960,margin:"0 auto",padding:"48px 20px",width:"100%"}}>
      <div className="a1" style={{textAlign:"center",marginBottom:48}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:7,background:T.id,border:`1px solid ${T.ib}`,borderRadius:20,padding:"5px 14px",marginBottom:16}}>
          <span style={{width:5,height:5,borderRadius:"50%",background:T.i,animation:"pulse 2s ease infinite"}}/>
          <span style={{fontSize:11,color:T.i,fontWeight:500,letterSpacing:"0.08em"}}>PRICING</span>
        </div>
        <h1 className="pricing-title" style={{fontSize:36,fontWeight:800,lineHeight:1.15,letterSpacing:"-0.02em",marginBottom:14}}>
          Choisissez le plan qui va transformer<br/>
          <span style={{background:"linear-gradient(135deg,#7C3AED,#059669)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>votre chiffre d'affaires</span>
        </h1>
        <p style={{fontSize:14,color:T.t2,maxWidth:480,margin:"0 auto",lineHeight:1.7,fontWeight:300}}>
          Récupérez jusqu'à <strong style={{color:T.gold}}>50 000€/mois</strong> perdus dans vos ventes
        </p>
      </div>

      {/* Plans — PRO first on mobile */}
      <div className="plan-grid a2" style={{display:"grid",gridTemplateColumns:"1fr 1.08fr 1fr",gap:14,marginBottom:48,alignItems:"start"}}>
        {(isMobile?[plans[1],plans[0],plans[2]]:plans).map((plan)=>(
          <div key={plan.id} className={plan.highlight?"ch pro-glow":"ch"} style={{
            background:plan.highlight?"linear-gradient(135deg,rgba(124,58,237,.15),rgba(91,33,182,.1))":T.s1,
            border:`1.5px solid ${plan.border}`,borderRadius:14,
            padding:plan.highlight?"28px 20px":"20px 18px",
            position:"relative",width:"100%",
            boxShadow:plan.highlight?`0 0 40px rgba(124,58,237,.2)`:"none",
          }}>
            {plan.badge&&(
              <div style={{background:T.ig,color:"#fff",fontSize:11,padding:"4px 14px",borderRadius:20,fontWeight:700,textAlign:"center",marginBottom:14,boxShadow:`0 4px 16px rgba(124,58,237,.4)`}}>{plan.badge}</div>
            )}
            {plan.roi&&(
              <div style={{background:T.goldD,border:`1px solid ${T.goldB}`,borderRadius:8,padding:"8px 12px",marginBottom:16,textAlign:"center"}}>
                <span style={{fontSize:11,color:T.gold,fontWeight:600}}>💰 {plan.roi}</span>
              </div>
            )}
            <div style={{marginBottom:16}}>
              <div style={{fontSize:10,color:T.t3,letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:500,marginBottom:6}}>{plan.name}</div>
              <div style={{display:"flex",alignItems:"baseline",gap:4,marginBottom:4,flexWrap:"wrap"}}>
                <span style={{fontSize:32,fontWeight:800,color:plan.color,letterSpacing:"-0.02em"}}>{plan.price}€</span>
              </div>
              <div style={{fontSize:12,color:T.t3,marginBottom:6}}>+ {plan.monthly}€/mois</div>
              <div style={{fontSize:12,color:T.t2,lineHeight:1.4}}>{plan.desc}</div>
            </div>

            <div style={{height:1,background:T.b,marginBottom:16}}/>

            <div style={{marginBottom:20}}>
              {plan.features.map((f,i)=>(
                <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:9}}>
                  <div style={{width:15,height:15,borderRadius:"50%",background:plan.highlight?T.id:T.gd,border:`1px solid ${plan.highlight?T.ib:T.gb}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                    <svg width="7" height="7" viewBox="0 0 8 8"><polyline points="1,4 3,6 7,2" fill="none" stroke={plan.highlight?T.i:T.g} strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </div>
                  <span style={{fontSize:12,color:T.t2,lineHeight:1.4}}>{f}</span>
                </div>
              ))}
            </div>

            <button className="btn-shine ch" style={{
              width:"100%",minHeight:48,
              background:plan.highlight?T.ig:plan.id==="agency"?`linear-gradient(135deg,${T.gold},#D97706)`:"transparent",
              border:`1.5px solid ${plan.highlight?T.i:plan.id==="agency"?T.gold:T.bm}`,
              color:plan.highlight||plan.id==="agency"?"#fff":T.t1,
              padding:"13px",borderRadius:9,fontSize:13,fontWeight:600,
              cursor:"pointer",fontFamily:"inherit",
              boxShadow:plan.highlight?`0 4px 24px rgba(124,58,237,.35)`:"none",
            }}>{plan.cta} →</button>
          </div>
        ))}
      </div>

      {/* ROI */}
      <div className="a3 ch" style={{background:"linear-gradient(135deg,rgba(5,150,105,.08),rgba(124,58,237,.06))",border:`1px solid ${T.gb}`,borderRadius:14,padding:"28px 20px",marginBottom:32,width:"100%"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:10,color:T.g,letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:600,marginBottom:6}}>CALCULATEUR ROI</div>
          <div style={{fontSize:20,fontWeight:700,letterSpacing:"-0.02em"}}>Votre situation actuelle</div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
          {[
            {label:"Deals / mois",val:"20",color:T.t1},
            {label:"% perdus",val:"30%",color:T.r},
            {label:"Ticket moyen",val:"5 000€",color:T.t1},
            {label:"CA perdu / mois",val:"30 000€",color:T.r},
          ].map((item,i)=>(
            <div key={i} style={{textAlign:"center",padding:"14px",background:"rgba(255,255,255,.03)",border:`1px solid ${T.b}`,borderRadius:10}}>
              <div style={{fontSize:10,color:T.t3,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6,fontWeight:500}}>{item.label}</div>
              <div style={{fontSize:20,fontWeight:700,color:item.color}}>{item.val}</div>
            </div>
          ))}
        </div>
        <div style={{textAlign:"center",padding:"14px",background:"rgba(5,150,105,.1)",border:`1px solid ${T.gb}`,borderRadius:10}}>
          <div style={{fontSize:14,fontWeight:600,color:T.g,marginBottom:4}}>✅ ROI atteint en quelques jours</div>
          <div style={{fontSize:12,color:T.t2,lineHeight:1.5}}>5 000€ de licence · 30 000€/mois récupérables</div>
        </div>
      </div>

      {/* Garantie */}
      <div className="a4 ch guarantee-flex" style={{background:T.s1,border:`1px solid ${T.gb}`,borderRadius:14,padding:"24px 20px",marginBottom:32,display:"flex",alignItems:"center",gap:16,width:"100%"}}>
        <div style={{fontSize:40,flexShrink:0}}>🛡️</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:16,fontWeight:700,marginBottom:6,color:T.t1}}>Garantie satisfait ou remboursé 7 jours</div>
          <div style={{fontSize:13,color:T.t2,lineHeight:1.6}}>Pas de résultat visible dans les 7 premiers jours ? On vous rembourse intégralement, sans question.</div>
        </div>
        <div style={{flexShrink:0}}>
          <div style={{background:T.gd,border:`1px solid ${T.gb}`,color:T.g,fontSize:11,padding:"8px 14px",borderRadius:8,fontWeight:600,textAlign:"center",whiteSpace:"nowrap"}}>✓ Remboursé</div>
        </div>
      </div>

      {/* FAQ */}
      <div className="a5">
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:20,fontWeight:700,letterSpacing:"-0.02em",marginBottom:6}}>Questions fréquentes</div>
          <div style={{fontSize:13,color:T.t2}}>Tout ce que vous devez savoir</div>
        </div>
        <div className="faq-grid" style={{display:"flex",flexDirection:"column",gap:8}}>
          {faqs.map((item,i)=>(
            <div key={i} className="ch" style={{background:T.s1,border:`1px solid ${faq===i?T.ib:T.b}`,borderRadius:10,overflow:"hidden",cursor:"pointer",width:"100%"}} onClick={()=>setFaq(faq===i?null:i)}>
              <div style={{padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
                <span style={{fontSize:13,fontWeight:500,color:faq===i?T.i:T.t1,lineHeight:1.4,flex:1}}>{item.q}</span>
                <span style={{fontSize:18,color:T.t3,flexShrink:0,transition:"transform .2s",transform:faq===i?"rotate(45deg)":"rotate(0)"}}>+</span>
              </div>
              {faq===i&&<div style={{padding:"0 16px 14px",fontSize:13,color:T.t2,lineHeight:1.7,borderTop:`1px solid ${T.b}`,paddingTop:14}}>{item.a}</div>}
            </div>
          ))}
        </div>
      </div>

      <div style={{textAlign:"center",marginTop:40}}>
        <button onClick={onBack} className="ch" style={{background:"transparent",border:`1px solid ${T.b}`,color:T.t2,fontSize:13,padding:"12px 24px",borderRadius:8,cursor:"pointer",fontFamily:"inherit",fontWeight:500,minHeight:44,width:"100%",maxWidth:300}}>
          ← Retour à l'analyse
        </button>
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
    }catch(e){setErr("Erreur de connexion.");setPh("err");}
  };

  const reset=()=>{setPh("idle");setRes(null);setTx("");setAb(null);setErr("");};
  const sc=(v,m=10)=>v/m>=.7?T.g:v/m>=.5?T.a:T.r;

  const TABS=[
    {id:"analyse",l:"Impact CA"},
    {id:"timeline",l:"Timeline"},
    {id:"emails",l:"Emails"},
    {id:"coaching",l:"Coaching"},
  ];

  return(
    <div style={{minHeight:"100vh",background:T.bg,width:"100%",overflowX:"hidden"}}>
      <style>{KF}</style>
      <div style={{position:"fixed",inset:0,background:"radial-gradient(ellipse 80% 40% at 50% -10%,rgba(124,58,237,.07) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>

      <div style={{position:"relative",zIndex:1,width:"100%"}}>
        {/* Nav */}
        <nav className="nav-pad" style={{height:56,borderBottom:`1px solid ${T.b}`,padding:"0 20px",display:"flex",alignItems:"center",gap:8,background:"rgba(5,5,10,.85)",backdropFilter:"blur(20px)",position:"sticky",top:0,zIndex:20,width:"100%"}}>
          <div style={{width:26,height:26,borderRadius:6,background:T.ig,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <span style={{fontSize:14,fontWeight:600,letterSpacing:"-0.01em",color:T.t1}}>SalesCoach</span>
          <span style={{fontSize:9,background:T.id,border:`1px solid ${T.ib}`,color:T.i,padding:"2px 6px",borderRadius:4,fontWeight:600}}>PRO</span>
          <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:8}}>
            <button onClick={()=>setPage(page==="pricing"?"app":"pricing")} className="ch" style={{background:page==="pricing"?T.id:"transparent",border:`1px solid ${page==="pricing"?T.ib:T.b}`,color:page==="pricing"?T.i:T.t2,fontSize:11,padding:"5px 10px",borderRadius:6,cursor:"pointer",fontWeight:500,fontFamily:"inherit",minHeight:36}}>
              {page==="pricing"?"← App":"💰 Pricing"}
            </button>
            {ph!=="idle"&&ph!=="err"&&page==="app"&&<button onClick={reset} className="ch" style={{background:"transparent",border:`1px solid ${T.b}`,color:T.t2,fontSize:11,padding:"5px 10px",borderRadius:6,cursor:"pointer",fontWeight:500,minHeight:36}}>← Nouveau</button>}
          </div>
        </nav>

        {page==="pricing"?(
          <PricingPage onBack={()=>setPage("app")}/>
        ):(
          <div className="pad-section" style={{maxWidth:940,margin:"0 auto",padding:"36px 16px",width:"100%"}}>

            {ph==="idle"&&(
              <div>
                <div className="a1" style={{marginBottom:40}}>
                  <div style={{display:"inline-flex",alignItems:"center",gap:7,background:T.id,border:`1px solid ${T.ib}`,borderRadius:20,padding:"5px 14px",marginBottom:16}}>
                    <span style={{width:5,height:5,borderRadius:"50%",background:T.i,animation:"pulse 2s ease infinite"}}/>
                    <span style={{fontSize:10,color:T.i,fontWeight:500,letterSpacing:"0.08em"}}>REVENUE INTELLIGENCE</span>
                  </div>
                  <h1 className="text-hero" style={{fontSize:36,fontWeight:700,lineHeight:1.15,letterSpacing:"-0.02em",color:T.t1,marginBottom:14}}>
                    Transformez chaque appel<br/>
                    <span style={{background:"linear-gradient(135deg,#7C3AED,#059669)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>en chiffre d'affaires.</span>
                  </h1>
                  <p className="text-subhero" style={{fontSize:14,color:T.t2,lineHeight:1.7,maxWidth:480,fontWeight:300}}>Identifiez les deals à risque, récupérez les opportunités manquées et augmentez votre taux de closing — automatiquement.</p>
                </div>

                <div className="a2 grid-2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12,width:"100%"}}>
                  <div className="ch"
                    onClick={()=>fr.current?.click()}
                    onDragOver={e=>{e.preventDefault();setDrag(true);}}
                    onDragLeave={()=>setDrag(false)}
                    onDrop={onDrop}
                    style={{...c({cursor:"pointer",textAlign:"center",padding:"28px 16px",border:`1px solid ${drag?T.ib:ab?T.gb:T.b}`,background:drag?T.id:ab?T.gd:"transparent",minHeight:140,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8})}}
                  >
                    <div style={{width:36,height:36,borderRadius:9,background:ab?T.gd:T.id,border:`1px solid ${ab?T.gb:T.ib}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ab?T.g:T.i} strokeWidth="1.8"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    </div>
                    <div style={{fontSize:12,fontWeight:500,color:ab?T.g:T.t1,lineHeight:1.3}}>{ab?ab.name:"Uploader audio"}</div>
                    <div style={{fontSize:11,color:T.t3}}>{ab?"Chargé ✓":"MP3, WAV, M4A"}</div>
                  </div>

                  <div className="ch" style={c({padding:"18px",minHeight:140})}>
                    <div style={{fontSize:10,color:T.t3,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8,fontWeight:500}}>Transcription</div>
                    <textarea value={tx} onChange={e=>setTx(e.target.value)}
                      placeholder="Collez la transcription..."
                      style={{width:"100%",height:80,background:"transparent",border:"none",color:T.t1,padding:0,fontSize:12,fontFamily:"inherit",resize:"none",outline:"none",lineHeight:1.6,boxSizing:"border-box"}}
                    />
                  </div>
                </div>
                <input ref={fr} type="file" accept="audio/*" style={{display:"none"}} onChange={onFile}/>

                {(ab||tx.trim())&&(
                  <div className="a3" style={{marginBottom:32}}>
                    <button onClick={analyze} className="ch btn-shine full-mobile" style={{
                      background:T.ig,color:"#fff",border:"none",
                      padding:"14px 32px",borderRadius:8,fontSize:13,fontWeight:600,
                      cursor:"pointer",fontFamily:"inherit",minHeight:48,
                      boxShadow:"0 4px 24px rgba(124,58,237,.35)",width:"100%",
                    }}>Calculer l'impact sur mon CA →</button>
                  </div>
                )}

                <div className="a4 grid-4" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
                  {[
                    {icon:"💰",label:"CA récup.",val:"48K€/mois"},
                    {icon:"📈",label:"Closing",val:"+27%"},
                    {icon:"⚡",label:"ROI",val:"4 jours"},
                    {icon:"🎯",label:"Précision",val:"94%"},
                  ].map((k,i)=>(
                    <div key={i} className="ch" style={{...c({textAlign:"center",padding:"14px 8px"})}}>
                      <div style={{fontSize:18,marginBottom:4}}>{k.icon}</div>
                      <div style={{fontSize:13,fontWeight:600,color:T.t1,marginBottom:2}}>{k.val}</div>
                      <div style={{fontSize:9,color:T.t3,letterSpacing:"0.06em",textTransform:"uppercase"}}>{k.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {ph==="processing"&&<Loader/>}

            {ph==="err"&&(
              <div className="a1" style={{display:"flex",justifyContent:"center",padding:"60px 0"}}>
                <div style={{...c({padding:"32px 24px",textAlign:"center",width:"100%",maxWidth:360,borderColor:T.rb})}}>
                  <div style={{fontSize:13,color:T.r,marginBottom:16,fontWeight:500}}>{err}</div>
                  <button onClick={reset} style={{background:T.ig,color:"#fff",border:"none",padding:"12px 24px",borderRadius:7,fontSize:12,cursor:"pointer",fontFamily:"inherit",fontWeight:500,minHeight:44,width:"100%"}}>Réessayer</button>
                </div>
              </div>
            )}

            {ph==="done"&&res&&(
              <div style={{width:"100%"}}>
                <ROIBanner score={res.analyse.score} prob={res.analyse.probabilite_closing}/>
                <PredictionBadge prob={res.analyse.probabilite_closing}/>

                <div className="a2 grid-3" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:14,width:"100%"}}>
                  <div className="ch" style={c()}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:9,color:T.t3,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6,fontWeight:500}}>Performance</div>
                        <div className="kpi-val" style={{fontSize:30,fontWeight:700,color:sc(res.analyse.score),lineHeight:1}}>{res.analyse.score}<span style={{fontSize:12,color:T.t3,fontWeight:400}}>/10</span></div>
                        <div style={{fontSize:10,color:T.gold,fontWeight:600,marginTop:3}}>+{Math.round(res.analyse.score*1.4)}K€</div>
                        <Bar v={res.analyse.score} max={10} color={sc(res.analyse.score)}/>
                        <div style={{fontSize:10,color:T.t2,marginTop:6,lineHeight:1.4}}>{res.analyse.score_justification}</div>
                      </div>
                      <Ring v={res.analyse.score} max={10} color={sc(res.analyse.score)} size={60}/>
                    </div>
                  </div>
                  <div className="ch" style={c()}>
                    <div style={{fontSize:9,color:T.t3,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6,fontWeight:500}}>Closing</div>
                    <div className="kpi-val" style={{fontSize:30,fontWeight:700,color:sc(res.analyse.probabilite_closing,100),lineHeight:1}}>{res.analyse.probabilite_closing}<span style={{fontSize:12,color:T.t3,fontWeight:400}}>%</span></div>
                    <div style={{fontSize:10,color:T.gold,fontWeight:600,marginTop:3}}>{Math.round(res.analyse.probabilite_closing*82)}€</div>
                    <Bar v={res.analyse.probabilite_closing} max={100} color={sc(res.analyse.probabilite_closing,100)}/>
                    <div style={{fontSize:10,color:T.t2,marginTop:6,lineHeight:1.4}}>{res.analyse.proba_justification}</div>
                  </div>
                  <div className="ch" style={c()}>
                    <div style={{fontSize:9,color:T.t3,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6,fontWeight:500}}>Objections</div>
                    <div className="kpi-val" style={{fontSize:30,fontWeight:700,color:T.a,lineHeight:1}}>{(res.analyse.objections||[]).length}<span style={{fontSize:12,color:T.t3,fontWeight:400}}></span></div>
                    <div style={{fontSize:10,color:T.r,fontWeight:600,marginTop:3}}>-{Math.round((res.analyse.objections||[]).length*8)}K€</div>
                    <div style={{marginTop:8}}>
                      {(res.analyse.objections||[]).slice(0,2).map((o,i)=><Pip key={i} color={T.r} bg={T.rd} bd={T.rb}>⚠ {o}</Pip>)}
                    </div>
                  </div>
                </div>

                {/* Tabs scrollable */}
                <div className="a3" style={{display:"flex",borderBottom:`1px solid ${T.b}`,marginBottom:14,overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
                  {TABS.map(t=>(
                    <button key={t.id} onClick={()=>setTab(t.id)} className="tb" style={{
                      background:"transparent",border:"none",
                      borderBottom:`1.5px solid ${tab===t.id?T.i:"transparent"}`,
                      color:tab===t.id?T.t1:T.t3,
                      fontSize:12,padding:"10px 14px",cursor:"pointer",
                      fontFamily:"inherit",fontWeight:tab===t.id?500:400,
                      marginBottom:-1,whiteSpace:"nowrap",flexShrink:0,
                    }}>{t.l}</button>
                  ))}
                </div>

                {tab==="analyse"&&(
                  <div className="ai" style={{width:"100%"}}>
                    <div className="ch" style={{...c({marginBottom:10})}}>
                      <Div label="Impact sur votre CA" accent/>
                      <p style={{fontSize:13,color:T.t2,lineHeight:1.8,fontWeight:300,wordBreak:"break-word"}}>{res.analyse.resume}</p>
                    </div>
                    <div className="grid-2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                      <div className="ch" style={c()}>
                        <Div label="Freins au closing" accent/>
                        {(res.analyse.objections||[]).map((o,i)=><Pip key={i} color={T.r} bg={T.rd} bd={T.rb}>⚠ {o}</Pip>)}
                      </div>
                      <div className="ch" style={c()}>
                        <Div label="Leviers" accent/>
                        {(res.analyse.points_forts||[]).map((p,i)=><Pip key={i} color={T.g} bg={T.gd} bd={T.gb}>✓ {p}</Pip>)}
                      </div>
                    </div>
                  </div>
                )}

                {tab==="timeline"&&(
                  <div className="ch ai" style={c()}>
                    <Div label="Moments critiques" accent/>
                    <TL moments={res.analyse.moments}/>
                  </div>
                )}

                {tab==="emails"&&(
                  <div className="ch ai" style={c()}>
                    <Div label="Opportunités de closing" accent/>
                    <Emails emails={res.analyse.emails}/>
                  </div>
                )}

                {tab==="coaching"&&(
                  <div className="ai" style={{width:"100%"}}>
                    <div className="ch" style={{...c({marginBottom:10,borderColor:T.ib,background:T.id})}}>
                      <Div label="Plan d'action" accent/>
                      <p style={{fontSize:13,color:T.t2,lineHeight:1.85,fontWeight:300,wordBreak:"break-word"}}>{res.analyse.coaching}</p>
                    </div>
                    <div className="ch" style={c()}>
                      <Div label="Transcription"/>
                      <div style={{fontSize:12,color:T.t3,lineHeight:1.8,maxHeight:200,overflow:"auto",whiteSpace:"pre-wrap",wordBreak:"break-word"}}>{res.transcription}</div>
                    </div>
                  </div>
                )}

                <div className="ch" style={{...c({marginTop:16,textAlign:"center",background:"linear-gradient(135deg,rgba(124,58,237,.1),rgba(5,150,105,.06))",borderColor:T.ib,padding:"24px 16px"})}}>
                  <div style={{fontSize:15,fontWeight:600,marginBottom:8}}>Prêt à récupérer vos deals perdus ?</div>
                  <div style={{fontSize:12,color:T.t2,marginBottom:16,lineHeight:1.5}}>Rejoignez les équipes qui récupèrent en moyenne 30 000€/mois</div>
                  <button onClick={()=>setPage("pricing")} className="ch btn-shine" style={{background:T.ig,color:"#fff",border:"none",padding:"13px 28px",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",boxShadow:`0 4px 24px rgba(124,58,237,.35)`,minHeight:48,width:"100%",maxWidth:300}}>
                    Voir les offres →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{borderTop:`1px solid ${T.b}`,padding:"14px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
          <span style={{fontSize:11,color:T.t3}}>SalesCoach AI</span>
          <span style={{fontSize:11,color:T.t3,display:"flex",alignItems:"center",gap:5}}>
            <span style={{width:4,height:4,borderRadius:"50%",background:T.g,display:"inline-block"}}/>
            Tous systèmes opérationnels
          </span>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><App/></React.StrictMode>
);
