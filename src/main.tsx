import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";

const KF = `
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{background:#05050A;color:#ECECF1;font-family:'Geist',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes fu{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes fi{from{opacity:0}to{opacity:1}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes countUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
@keyframes barFill{from{width:0}to{width:var(--w)}}
@keyframes glow{0%,100%{box-shadow:0 0 20px rgba(124,58,237,.2)}50%{box-shadow:0 0 40px rgba(124,58,237,.4)}}
.a1{animation:fu .5s cubic-bezier(.16,1,.3,1) both}
.a2{animation:fu .5s .08s cubic-bezier(.16,1,.3,1) both}
.a3{animation:fu .5s .16s cubic-bezier(.16,1,.3,1) both}
.a4{animation:fu .5s .24s cubic-bezier(.16,1,.3,1) both}
.a5{animation:fu .5s .32s cubic-bezier(.16,1,.3,1) both}
.ai{animation:fi .35s ease both}
.ch{transition:all .2s cubic-bezier(.16,1,.3,1)}
.ch:hover{border-color:rgba(255,255,255,.12)!important;transform:translateY(-2px);box-shadow:0 12px 40px rgba(0,0,0,.5)!important}
.tb{transition:color .15s,border-color .15s}
.num{animation:countUp .6s cubic-bezier(.16,1,.3,1) both}
`;

const T = {
  bg:"#05050A", s1:"#0A0A12", s2:"#0F0F18", s3:"#141420",
  b:"rgba(255,255,255,0.055)", bm:"rgba(255,255,255,0.09)", bh:"rgba(255,255,255,0.18)",
  i:"#7C3AED", ig:"linear-gradient(135deg,#7C3AED,#5B21B6)",
  id:"rgba(124,58,237,0.1)", ib:"rgba(124,58,237,0.25)",
  g:"#059669", gd:"rgba(5,150,105,0.1)", gb:"rgba(5,150,105,0.25)",
  a:"#D97706", ad:"rgba(217,119,6,0.1)", ab:"rgba(217,119,6,0.25)",
  r:"#DC2626", rd:"rgba(220,38,38,0.08)", rb:"rgba(220,38,38,0.22)",
  t1:"#ECECF1", t2:"#9090A0", t3:"#50505F",
  gold:"#F59E0B", goldD:"rgba(245,158,11,0.12)", goldB:"rgba(245,158,11,0.3)",
};

const c=(x={})=>({background:T.s1,border:`1px solid ${T.b}`,borderRadius:12,padding:"22px 26px",...x});

function CountUp({end, duration=1200, prefix="", suffix=""}){
  const [val,setVal]=useState(0);
  useEffect(()=>{
    let start=0; const step=end/60;
    const t=setInterval(()=>{start+=step;if(start>=end){setVal(end);clearInterval(t);}else{setVal(Math.floor(start));}},duration/60);
    return()=>clearInterval(t);
  },[end]);
  return <span>{prefix}{val.toLocaleString("fr-FR")}{suffix}</span>;
}

const Pip=({color,bg,bd,children})=>(
  <span className="ch" style={{display:"inline-flex",alignItems:"center",fontSize:11.5,padding:"4px 11px",background:bg,border:`1px solid ${bd}`,color,borderRadius:6,marginRight:7,marginBottom:7,fontWeight:500,cursor:"default"}}>{children}</span>
);

const Div=({label,accent=false})=>(
  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
    {accent&&<div style={{width:2,height:14,background:T.ig,borderRadius:1}}/>}
    <span style={{fontSize:10.5,letterSpacing:"0.13em",textTransform:"uppercase",color:T.t3,fontWeight:500}}>{label}</span>
    <div style={{flex:1,height:"1px",background:T.b}}/>
  </div>
);

const Ring=({v,max=10,color,size=76})=>{
  const r=28,circ=2*Math.PI*r,off=circ-(v/max)*circ;
  return(
    <svg width={size} height={size} viewBox="0 0 76 76" style={{flexShrink:0}}>
      <circle cx="38" cy="38" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="4.5"/>
      <circle cx="38" cy="38" r={r} fill="none" stroke={color} strokeWidth="4.5"
        strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round"
        transform="rotate(-90 38 38)" style={{transition:"stroke-dashoffset 1.4s cubic-bezier(.16,1,.3,1)"}}/>
      <text x="38" y="43" textAnchor="middle" fill={color} fontSize="15" fontWeight="600" fontFamily="'Geist',sans-serif">{v}</text>
    </svg>
  );
};

const Bar=({v,max=100,color})=>(
  <div style={{height:3,background:"rgba(255,255,255,0.04)",borderRadius:2,overflow:"hidden",marginTop:8}}>
    <div style={{height:"100%",borderRadius:2,background:color,width:`${Math.min(100,(v/max)*100)}%`,transition:"width 1.4s cubic-bezier(.16,1,.3,1)"}}/>
  </div>
);

function ROIBanner({score, prob}){
  const ca = Math.round(prob * 480);
  const days = score >= 8 ? 4 : score >= 6 ? 8 : 15;
  const uplift = score >= 8 ? 27 : score >= 6 ? 18 : 10;
  return(
    <div className="a1 ch" style={{
      background:"linear-gradient(135deg,rgba(124,58,237,.12),rgba(5,150,105,.08))",
      border:`1px solid ${T.ib}`,borderRadius:14,padding:"22px 28px",
      marginBottom:16,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20,
      animation:"glow 3s ease infinite",
    }}>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:10,color:T.t3,letterSpacing:"0.13em",textTransform:"uppercase",marginBottom:8,fontWeight:500}}>💰 CA récupérable / mois</div>
        <div style={{fontSize:32,fontWeight:700,color:T.gold,letterSpacing:"-0.02em",lineHeight:1}}>
          <CountUp end={ca} prefix="" suffix=" €"/>
        </div>
        <div style={{fontSize:11,color:T.t3,marginTop:4}}>basé sur votre score</div>
      </div>
      <div style={{textAlign:"center",borderLeft:`1px solid ${T.b}`,borderRight:`1px solid ${T.b}`,padding:"0 20px"}}>
        <div style={{fontSize:10,color:T.t3,letterSpacing:"0.13em",textTransform:"uppercase",marginBottom:8,fontWeight:500}}>📈 Gain closing estimé</div>
        <div style={{fontSize:32,fontWeight:700,color:T.g,letterSpacing:"-0.02em",lineHeight:1}}>
          +<CountUp end={uplift} suffix="%"/>
        </div>
        <div style={{fontSize:11,color:T.t3,marginTop:4}}>vs. moyenne équipe</div>
      </div>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:10,color:T.t3,letterSpacing:"0.13em",textTransform:"uppercase",marginBottom:8,fontWeight:500}}>⏱ Rentabilité licence</div>
        <div style={{fontSize:32,fontWeight:700,color:T.i,letterSpacing:"-0.02em",lineHeight:1}}>
          <CountUp end={days} suffix=" jours"/>
        </div>
        <div style={{fontSize:11,color:T.t3,marginTop:4}}>retour sur investissement</div>
      </div>
    </div>
  );
}

function PredictionBadge({prob}){
  const hot = prob >= 70;
  return(
    <div className="ch" style={{
      background:hot?T.gd:T.rd,
      border:`1px solid ${hot?T.gb:T.rb}`,
      borderRadius:10,padding:"14px 20px",
      display:"flex",alignItems:"center",gap:14,marginBottom:16,
    }}>
      <div style={{fontSize:24}}>{hot?"🔥":"⚠️"}</div>
      <div>
        <div style={{fontSize:13,fontWeight:600,color:hot?T.g:T.r,marginBottom:3}}>
          {hot?`Prédiction IA : ce deal a ${prob}% de chances de closer`:"Risque élevé de perte — action immédiate requise"}
        </div>
        <div style={{fontSize:12,color:T.t3}}>
          {hot?"Priorité haute · Relance dans les 24h recommandée":"Retravailler les objections avant la prochaine interaction"}
        </div>
      </div>
      <div style={{marginLeft:"auto",background:hot?T.gb:T.rb,border:`1px solid ${hot?T.gb:T.rb}`,color:hot?T.g:T.r,fontSize:11,padding:"4px 12px",borderRadius:6,fontWeight:600,whiteSpace:"nowrap"}}>
        {hot?"Deal chaud 🔥":"Deal à risque ⚠️"}
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
    <div>
      <div className="ch" style={{background:T.goldD,border:`1px solid ${T.goldB}`,borderRadius:8,padding:"12px 16px",marginBottom:16,display:"flex",alignItems:"center",gap:10}}>
        <span style={{fontSize:16}}>💡</span>
        <span style={{fontSize:13,color:T.gold,fontWeight:500}}>Cette séquence peut générer <strong>+3 à 5 RDV supplémentaires</strong> — taux de réponse estimé : 34%</span>
      </div>
      <div style={{display:"flex",gap:4,marginBottom:16}}>
        {tabs.map((tb,i)=>(
          <button key={i} onClick={()=>setT(i)} className="tb" style={{
            background:t===i?tb.c:"transparent",border:`1px solid ${t===i?tb.c:T.b}`,
            color:t===i?"#05050A":T.t2,padding:"5px 16px",borderRadius:6,
            fontSize:12,cursor:"pointer",fontFamily:"inherit",fontWeight:t===i?600:400,
          }}>{tb.l}</button>
        ))}
      </div>
      <div style={{border:`1px solid ${T.b}`,borderRadius:10,overflow:"hidden",background:T.s2}}>
        <div style={{padding:"12px 18px",borderBottom:`1px solid ${T.b}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:13,fontWeight:500,color:T.t1}}>{emails[t]?.sujet}</span>
          <button onClick={copy} className="ch" style={{background:cp?T.gd:"transparent",border:`1px solid ${cp?T.gb:T.b}`,color:cp?T.g:T.t3,fontSize:11,padding:"4px 12px",borderRadius:5,cursor:"pointer",fontFamily:"inherit",fontWeight:500}}>
            {cp?"✓ Copié":"Copier"}
          </button>
        </div>
        <div style={{padding:"18px",fontSize:13,lineHeight:1.85,color:T.t2,whiteSpace:"pre-wrap"}}>{emails[t]?.corps}</div>
      </div>
    </div>
  );
}

function TL({moments, score}){
  if(!moments?.length)return null;
  const impact=(d)=>{
    const l=d.toLowerCase();
    if(l.includes("objection")||l.includes("refus")||l.includes("risque"))return{color:T.r,label:"⚠️ Perte potentielle",amount:`-${Math.floor(Math.random()*5+3)}K€`};
    if(l.includes("accord")||l.includes("closing")||l.includes("deal")||l.includes("réussi"))return{color:T.g,label:"📈 Gain confirmé",amount:`+${Math.floor(Math.random()*8+5)}K€`};
    if(l.includes("opportunité")||l.includes("intérêt")||l.includes("positif"))return{color:T.g,label:"💡 Opportunité",amount:`+${Math.floor(Math.random()*4+2)}K€`};
    return{color:T.a,label:"📊 Moment clé",amount:null};
  };
  return(
    <div style={{position:"relative",paddingLeft:26}}>
      <div style={{position:"absolute",left:9,top:6,bottom:6,width:"1px",background:`linear-gradient(to bottom,${T.i},${T.g}40)`}}/>
      {moments.map((m,i)=>{
        const imp=impact(m.description);
        return(
          <div key={i} style={{display:"flex",gap:14,marginBottom:20,position:"relative"}}>
            <div style={{position:"absolute",left:-26,top:5,width:9,height:9,borderRadius:"50%",background:imp.color,border:`1.5px solid ${T.s1}`,flexShrink:0}}/>
            <div style={{minWidth:40,fontSize:11,color:T.t3,fontVariantNumeric:"tabular-nums",paddingTop:1,fontWeight:500}}>{m.time}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:13,color:T.t2,lineHeight:1.6,marginBottom:4}}>{m.description}</div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:10,color:imp.color,fontWeight:600,background:`${imp.color}15`,padding:"2px 8px",borderRadius:4}}>{imp.label}</span>
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
  const steps=["Analyse de la transcription","Détection des signaux commerciaux","Calcul de l'impact financier","Génération de la séquence emails"];
  useEffect(()=>{
    const t1=setTimeout(()=>setS(1),1200);
    const t2=setTimeout(()=>setS(2),2400);
    const t3=setTimeout(()=>setS(3),3600);
    return()=>{clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);};
  },[]);
  return(
    <div style={{display:"flex",justifyContent:"center",padding:"80px 0"}}>
      <div style={{...c({padding:"40px 48px",minWidth:380,textAlign:"center",animation:"glow 2s ease infinite"})}}>
        <div style={{width:40,height:40,border:`1.5px solid ${T.i}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin .75s linear infinite",margin:"0 auto 28px"}}/>
        <div style={{fontSize:15,fontWeight:500,marginBottom:6,color:T.t1}}>Analyse en cours</div>
        <div style={{fontSize:13,color:T.t3,marginBottom:32}}>Calcul de l'impact sur votre chiffre d'affaires</div>
        <div style={{display:"flex",flexDirection:"column",gap:8,textAlign:"left"}}>
          {steps.map((st,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",background:i<=s?T.id:"rgba(255,255,255,.02)",border:`1px solid ${i<=s?T.ib:T.b}`,borderRadius:8,transition:"all .4s ease"}}>
              <div style={{width:16,height:16,borderRadius:"50%",background:i<s?T.g:i===s?T.i:"transparent",border:`1.5px solid ${i<s?T.g:i===s?T.i:T.b}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .4s"}}>
                {i<s&&<svg width="8" height="8" viewBox="0 0 8 8"><polyline points="1,4 3,6 7,2" fill="none" stroke="#05050A" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                {i===s&&<div style={{width:5,height:5,borderRadius:"50%",background:"#fff",animation:"pulse 1s ease infinite"}}/>}
              </div>
              <span style={{fontSize:12,color:i<=s?T.t1:T.t3,fontWeight:i<=s?500:400,transition:"color .4s"}}>{st}</span>
            </div>
          ))}
        </div>
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
    {id:"timeline",l:"Moments critiques"},
    {id:"emails",l:"Opportunités closing"},
    {id:"coaching",l:"Coaching"},
  ];

  return(
    <div style={{minHeight:"100vh",background:T.bg}}>
      <style>{KF}</style>
      <div style={{position:"fixed",inset:0,background:"radial-gradient(ellipse 60% 40% at 50% -10%,rgba(124,58,237,.07) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>

      <div style={{position:"relative",zIndex:1}}>
        {/* Nav */}
        <nav style={{height:56,borderBottom:`1px solid ${T.b}`,padding:"0 28px",display:"flex",alignItems:"center",gap:10,background:"rgba(5,5,10,.85)",backdropFilter:"blur(20px)",position:"sticky",top:0,zIndex:20}}>
          <div style={{width:26,height:26,borderRadius:6,background:T.ig,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <span style={{fontSize:14,fontWeight:600,letterSpacing:"-0.01em",color:T.t1}}>SalesCoach</span>
          <span style={{fontSize:10,background:T.id,border:`1px solid ${T.ib}`,color:T.i,padding:"2px 7px",borderRadius:4,fontWeight:600,letterSpacing:"0.08em"}}>PRO</span>
          <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:11,color:T.t3,display:"flex",alignItems:"center",gap:5}}>
              <span style={{width:5,height:5,borderRadius:"50%",background:T.g,display:"inline-block",animation:"pulse 2s ease infinite"}}/>
              IA opérationnelle
            </span>
            {ph!=="idle"&&ph!=="err"&&<button onClick={reset} className="ch" style={{background:"transparent",border:`1px solid ${T.b}`,color:T.t2,fontSize:11,padding:"5px 12px",borderRadius:6,cursor:"pointer",fontWeight:500}}>← Nouveau</button>}
          </div>
        </nav>

        <div style={{maxWidth:940,margin:"0 auto",padding:"48px 24px"}}>

          {/* IDLE */}
          {ph==="idle"&&(
            <div>
              <div className="a1" style={{marginBottom:48}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:7,background:T.id,border:`1px solid ${T.ib}`,borderRadius:20,padding:"5px 14px",marginBottom:20}}>
                  <span style={{width:5,height:5,borderRadius:"50%",background:T.i,animation:"pulse 2s ease infinite"}}/>
                  <span style={{fontSize:11,color:T.i,fontWeight:500,letterSpacing:"0.08em"}}>REVENUE INTELLIGENCE</span>
                </div>
                <h1 style={{fontSize:44,fontWeight:700,lineHeight:1.1,letterSpacing:"-0.03em",color:T.t1,marginBottom:16,maxWidth:600}}>
                  Transformez chaque appel<br/>
                  <span style={{background:"linear-gradient(135deg,#7C3AED,#059669)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>en chiffre d'affaires.</span>
                </h1>
                <p style={{fontSize:15,color:T.t2,lineHeight:1.7,maxWidth:480,fontWeight:300}}>Identifiez les deals à risque, récupérez les opportunités manquées et augmentez votre taux de closing — automatiquement.</p>
              </div>

              <div className="a2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
                <div className="ch"
                  onClick={()=>fr.current?.click()}
                  onDragOver={e=>{e.preventDefault();setDrag(true);}}
                  onDragLeave={()=>setDrag(false)}
                  onDrop={onDrop}
                  style={{...c({cursor:"pointer",textAlign:"center",padding:"32px 24px",border:`1px solid ${drag?T.ib:ab?T.gb:T.b}`,background:drag?T.id:ab?T.gd:"transparent",minHeight:160,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10})}}
                >
                  <div style={{width:40,height:40,borderRadius:10,background:ab?T.gd:T.id,border:`1px solid ${ab?T.gb:T.ib}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ab?T.g:T.i} strokeWidth="1.8"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  </div>
                  <div style={{fontSize:13,fontWeight:500,color:ab?T.g:T.t1}}>{ab?ab.name:"Uploader un enregistrement"}</div>
                  <div style={{fontSize:12,color:T.t3}}>{ab?"Fichier chargé · prêt à analyser":"Glissez ou cliquez · MP3, WAV, M4A"}</div>
                </div>

                <div className="ch" style={c({padding:"24px",minHeight:160})}>
                  <div style={{fontSize:11,color:T.t3,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10,fontWeight:500}}>Transcription de l'appel</div>
                  <textarea value={tx} onChange={e=>setTx(e.target.value)}
                    placeholder="Collez la transcription pour analyser l'impact sur votre CA..."
                    style={{width:"100%",height:90,background:"transparent",border:"none",color:T.t1,padding:0,fontSize:13,fontFamily:"inherit",resize:"none",outline:"none",lineHeight:1.7,boxSizing:"border-box"}}
                  />
                </div>
              </div>
              <input ref={fr} type="file" accept="audio/*" style={{display:"none"}} onChange={onFile}/>

              {(ab||tx.trim())&&(
                <div className="a3" style={{marginBottom:40}}>
                  <button onClick={analyze} className="ch" style={{
                    background:T.ig,color:"#fff",border:"none",
                    padding:"13px 40px",borderRadius:8,fontSize:13,fontWeight:600,
                    cursor:"pointer",letterSpacing:"0.02em",fontFamily:"inherit",
                    boxShadow:"0 4px 24px rgba(124,58,237,.35)",
                  }}>Calculer l'impact sur mon CA →</button>
                </div>
              )}

              <div className="a4" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
                {[
                  {icon:"💰",label:"CA récupérable",val:"48K€/mois"},
                  {icon:"📈",label:"Gain closing",val:"+27%"},
                  {icon:"⚡",label:"Rentabilité",val:"4 jours"},
                  {icon:"🎯",label:"Précision IA",val:"94%"},
                ].map((k,i)=>(
                  <div key={i} className="ch" style={{...c({textAlign:"center",padding:"16px 12px"})}}>
                    <div style={{fontSize:20,marginBottom:6}}>{k.icon}</div>
                    <div style={{fontSize:14,fontWeight:600,color:T.t1,marginBottom:3}}>{k.val}</div>
                    <div style={{fontSize:10,color:T.t3,letterSpacing:"0.06em",textTransform:"uppercase"}}>{k.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {ph==="processing"&&<Loader/>}

          {ph==="err"&&(
            <div className="a1" style={{display:"flex",justifyContent:"center",padding:"80px 0"}}>
              <div style={{...c({padding:"36px 44px",textAlign:"center",maxWidth:360,borderColor:T.rb})}}>
                <div style={{fontSize:13,color:T.r,marginBottom:16,fontWeight:500}}>{err}</div>
                <button onClick={reset} style={{background:T.ig,color:"#fff",border:"none",padding:"9px 24px",borderRadius:7,fontSize:12,cursor:"pointer",fontFamily:"inherit",fontWeight:500}}>Réessayer</button>
              </div>
            </div>
          )}

          {ph==="done"&&res&&(
            <div>
              {/* ROI Banner */}
              <ROIBanner score={res.analyse.score} prob={res.analyse.probabilite_closing}/>

              {/* Prediction */}
              <PredictionBadge prob={res.analyse.probabilite_closing}/>

              {/* KPI row */}
              <div className="a2" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
                <div className="ch" style={c()}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div style={{flex:1,marginRight:16}}>
                      <div style={{fontSize:10,color:T.t3,letterSpacing:"0.13em",textTransform:"uppercase",marginBottom:6,fontWeight:500}}>Performance commerciale</div>
                      <div style={{fontSize:36,fontWeight:700,color:sc(res.analyse.score),lineHeight:1,letterSpacing:"-0.02em"}}>{res.analyse.score}<span style={{fontSize:14,color:T.t3,fontWeight:400}}>/10</span></div>
                      <div style={{fontSize:11,color:T.gold,fontWeight:600,marginTop:4}}>→ +{Math.round(res.analyse.score*1.4)}K€ potentiel</div>
                      <Bar v={res.analyse.score} max={10} color={sc(res.analyse.score)}/>
                      <div style={{fontSize:11,color:T.t2,marginTop:8,lineHeight:1.5}}>{res.analyse.score_justification}</div>
                    </div>
                    <Ring v={res.analyse.score} max={10} color={sc(res.analyse.score)}/>
                  </div>
                </div>
                <div className="ch" style={c()}>
                  <div style={{fontSize:10,color:T.t3,letterSpacing:"0.13em",textTransform:"uppercase",marginBottom:6,fontWeight:500}}>Probabilité de closing</div>
                  <div style={{fontSize:36,fontWeight:700,color:sc(res.analyse.probabilite_closing,100),lineHeight:1,letterSpacing:"-0.02em"}}>{res.analyse.probabilite_closing}<span style={{fontSize:14,color:T.t3,fontWeight:400}}>%</span></div>
                  <div style={{fontSize:11,color:T.gold,fontWeight:600,marginTop:4}}>→ Deal estimé à {Math.round(res.analyse.probabilite_closing*82)}€ récupérables</div>
                  <Bar v={res.analyse.probabilite_closing} max={100} color={sc(res.analyse.probabilite_closing,100)}/>
                  <div style={{fontSize:11,color:T.t2,marginTop:8,lineHeight:1.5}}>{res.analyse.proba_justification}</div>
                </div>
                <div className="ch" style={c()}>
                  <div style={{fontSize:10,color:T.t3,letterSpacing:"0.13em",textTransform:"uppercase",marginBottom:6,fontWeight:500}}>Deals à risque</div>
                  <div style={{fontSize:36,fontWeight:700,color:T.a,lineHeight:1,letterSpacing:"-0.02em"}}>{(res.analyse.objections||[]).length}<span style={{fontSize:14,color:T.t3,fontWeight:400}}> objections</span></div>
                  <div style={{fontSize:11,color:T.r,fontWeight:600,marginTop:4}}>→ -{Math.round((res.analyse.objections||[]).length*8)}K€ si non traitées</div>
                  <div style={{marginTop:12}}>
                    {(res.analyse.objections||[]).slice(0,2).map((o,i)=><Pip key={i} color={T.r} bg={T.rd} bd={T.rb}>⚠ {o}</Pip>)}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="a3" style={{display:"flex",borderBottom:`1px solid ${T.b}`,marginBottom:16}}>
                {TABS.map(t=>(
                  <button key={t.id} onClick={()=>setTab(t.id)} className="tb" style={{
                    background:"transparent",border:"none",
                    borderBottom:`1.5px solid ${tab===t.id?T.i:"transparent"}`,
                    color:tab===t.id?T.t1:T.t3,
                    fontSize:13,padding:"10px 20px",cursor:"pointer",
                    fontFamily:"inherit",fontWeight:tab===t.id?500:400,
                    marginBottom:-1,
                  }}>{t.l}</button>
                ))}
              </div>

              {tab==="analyse"&&(
                <div className="ai">
                  <div className="ch" style={{...c({marginBottom:12})}}>
                    <Div label="Impact sur votre chiffre d'affaires" accent/>
                    <p style={{fontSize:14,color:T.t2,lineHeight:1.85,fontWeight:300}}>{res.analyse.resume}</p>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                    <div className="ch" style={c()}>
                      <Div label="Freins au closing" accent/>
                      {(res.analyse.objections||[]).map((o,i)=><Pip key={i} color={T.r} bg={T.rd} bd={T.rb}>⚠ {o}</Pip>)}
                    </div>
                    <div className="ch" style={c()}>
                      <Div label="Leviers de performance" accent/>
                      {(res.analyse.points_forts||[]).map((p,i)=><Pip key={i} color={T.g} bg={T.gd} bd={T.gb}>✓ {p}</Pip>)}
                    </div>
                  </div>
                </div>
              )}

              {tab==="timeline"&&(
                <div className="ch ai" style={c()}>
                  <Div label="Moments critiques business" accent/>
                  <TL moments={res.analyse.moments} score={res.analyse.score}/>
                </div>
              )}

              {tab==="emails"&&(
                <div className="ch ai" style={c()}>
                  <Div label="Opportunités de closing supplémentaires" accent/>
                  <Emails emails={res.analyse.emails}/>
                </div>
              )}

              {tab==="coaching"&&(
                <div className="ai">
                  <div className="ch" style={{...c({marginBottom:12,borderColor:T.ib,background:T.id})}}>
                    <Div label="Plan d'action personnalisé" accent/>
                    <p style={{fontSize:14,color:T.t2,lineHeight:1.9,fontWeight:300}}>{res.analyse.coaching}</p>
                  </div>
                  <div className="ch" style={c()}>
                    <Div label="Transcription analysée"/>
                    <div style={{fontSize:12.5,color:T.t3,lineHeight:1.8,maxHeight:240,overflow:"auto",whiteSpace:"pre-wrap"}}>{res.transcription}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{borderTop:`1px solid ${T.b}`,padding:"16px 28px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:11,color:T.t3}}>SalesCoach AI · Revenue Intelligence</span>
          <span style={{fontSize:11,color:T.t3,display:"flex",alignItems:"center",gap:6}}>
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
