import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom/client";

const KF = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
@keyframes barGrow{from{width:0}to{width:var(--w)}}
@keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
.fu{animation:fadeUp .4s cubic-bezier(.16,1,.3,1) both}
.fu2{animation:fadeUp .4s .1s cubic-bezier(.16,1,.3,1) both}
.fu3{animation:fadeUp .4s .2s cubic-bezier(.16,1,.3,1) both}
.fu4{animation:fadeUp .4s .3s cubic-bezier(.16,1,.3,1) both}
body{background:#080810;color:#E8E8F2;font-family:'DM Mono',monospace}
`;

const C = {
  bg:"#080810", s1:"#0E0E1A", s2:"#141422", s3:"#1A1A2E",
  border:"rgba(255,255,255,0.06)", borderHi:"rgba(255,255,255,0.14)",
  accent:"#FF4D1C", accentDim:"rgba(255,77,28,0.12)", accentBorder:"rgba(255,77,28,0.35)",
  gold:"#FFB547", goldDim:"rgba(255,181,71,0.1)", goldBorder:"rgba(255,181,71,0.3)",
  green:"#00E599", greenDim:"rgba(0,229,153,0.1)", greenBorder:"rgba(0,229,153,0.3)",
  blue:"#4D9EFF", blueDim:"rgba(77,158,255,0.1)", blueBorder:"rgba(77,158,255,0.3)",
  text:"#E8E8F2", muted:"#6B6B8A", dim:"#2A2A3E",
};

const card = (x={}) => ({
  background:C.s1, border:`1px solid ${C.border}`,
  borderRadius:12, padding:"20px 24px", ...x
});

const Tag = ({children,color,bg,border}) => (
  <span style={{display:"inline-block",fontSize:11,padding:"4px 12px",background:bg,border:`1px solid ${border}`,color,borderRadius:6,marginRight:8,marginBottom:8,fontFamily:"'DM Mono',monospace",letterSpacing:"0.02em"}}>{children}</span>
);

const SH = ({children}) => (
  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
    <span style={{fontSize:10,letterSpacing:"0.15em",textTransform:"uppercase",color:C.muted,whiteSpace:"nowrap",fontFamily:"'Syne',sans-serif",fontWeight:600}}>{children}</span>
    <div style={{flex:1,height:"1px",background:C.border}}/>
  </div>
);

const ScoreRing = ({value, max=10, color, size=80}) => {
  const r = 28, circ = 2*Math.PI*r;
  const fill = circ - (value/max)*circ;
  return (
    <svg width={size} height={size} viewBox="0 0 70 70">
      <circle cx="35" cy="35" r={r} fill="none" stroke={C.dim} strokeWidth="4"/>
      <circle cx="35" cy="35" r={r} fill="none" stroke={color} strokeWidth="4"
        strokeDasharray={circ} strokeDashoffset={fill}
        strokeLinecap="round" transform="rotate(-90 35 35)"
        style={{transition:"stroke-dashoffset 1.2s cubic-bezier(.16,1,.3,1)"}}/>
      <text x="35" y="38" textAnchor="middle" fill={color} fontSize="16" fontWeight="700" fontFamily="'Syne',sans-serif">{value}</text>
    </svg>
  );
};

const Bar = ({v, max=100, color}) => (
  <div style={{height:4,background:"rgba(255,255,255,0.05)",borderRadius:2,overflow:"hidden",marginTop:8}}>
    <div style={{height:"100%",borderRadius:2,background:color,width:`${Math.min(100,(v/max)*100}%`,transition:"width 1.2s cubic-bezier(.16,1,.3,1)"}}/>
  </div>
);

function EmailTabs({emails}) {
  const [tab,setTab] = useState(0);
  const labels = ["J+1","J+3","J+7"];
  const colors = [C.green, C.gold, C.blue];
  if(!emails?.length) return null;
  return (
    <div>
      <div style={{display:"flex",gap:4,marginBottom:16}}>
        {labels.map((l,i) => (
          <button key={i} onClick={()=>setTab(i)} style={{
            background:tab===i?colors[i]:"transparent",
            border:`1px solid ${tab===i?colors[i]:C.border}`,
            color:tab===i?"#080810":C.muted,
            padding:"6px 16px",borderRadius:6,fontSize:11,cursor:"pointer",
            fontFamily:"'Syne',sans-serif",fontWeight:600,letterSpacing:"0.06em",
            transition:"all .2s",
          }}>{l}</button>
        ))}
      </div>
      <div style={{border:`1px solid ${C.border}`,borderRadius:10,overflow:"hidden"}}>
        <div style={{padding:"12px 18px",borderBottom:`1px solid ${C.border}`,background:"rgba(0,0,0,0.3)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:13,fontWeight:600,color:colors[tab],fontFamily:"'Syne',sans-serif"}}>{emails[tab]?.sujet}</span>
          <span style={{fontSize:10,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase"}}>{labels[tab]}</span>
        </div>
        <div style={{padding:"18px",fontSize:12,lineHeight:1.9,color:"#B8B8D0",whiteSpace:"pre-wrap"}}>{emails[tab]?.corps}</div>
      </div>
    </div>
  );
}

function Timeline({moments}) {
  if(!moments?.length) return null;
  const color = (d) => {
    const dl = d.toLowerCase();
    if(dl.includes("objection")||dl.includes("prix")||dl.includes("hésit")) return C.accent;
    if(dl.includes("accord")||dl.includes("intérêt")||dl.includes("positif")||dl.includes("closing")) return C.green;
    return C.gold;
  };
  return (
    <div style={{position:"relative",paddingLeft:24}}>
      <div style={{position:"absolute",left:9,top:6,bottom:6,width:"1px",background:`linear-gradient(to bottom, ${C.accent}, ${C.green})`}}/>
      {moments.map((m,i) => (
        <div key={i} style={{display:"flex",gap:16,marginBottom:20,position:"relative"}}>
          <div style={{position:"absolute",left:-24,top:5,width:10,height:10,borderRadius:"50%",background:color(m.description),border:`2px solid ${C.s1}`,boxShadow:`0 0 8px ${color(m.description)}`}}/>
          <div style={{minWidth:44,fontSize:10,color:C.muted,fontVariantNumeric:"tabular-nums",paddingTop:2,letterSpacing:"0.05em"}}>{m.time}</div>
          <div style={{fontSize:12,color:"#C0C0DA",lineHeight:1.6}}>{m.description}</div>
        </div>
      ))}
    </div>
  );
}

function App() {
  const [phase, setPhase] = useState("idle");
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [audioBlob, setAudioBlob] = useState(null);
  const [activeTab, setActiveTab] = useState("analyse");
  const fileRef = useRef(null);

  const onFile = (e) => {
    const f = e.target.files[0];
    if(!f) return;
    setAudioBlob(f);
  };

  const analyze = async () => {
    setPhase("processing");
    try {
      const {transcription} = await fetch("/api/transcribe",{method:"POST"}).then(r=>r.json());
      const analyse = await fetch("/api/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({transcription})}).then(r=>r.json());
      const email = await fetch("/api/email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({transcription,analyse})}).then(r=>r.json());
      setResult({transcription, analyse, email});
      setPhase("done");
      setActiveTab("analyse");
    } catch(e) {
      setErrMsg("Erreur de connexion. Réessayez.");
      setPhase("err");
    }
  };

  const reset = () => {setPhase("idle");setResult(null);setTranscript("");setAudioBlob(null);setErrMsg("");};
  const sc = (v,max=10) => v/max>=.7?C.green:v/max>=.5?C.gold:C.accent;

  const TABS = [{id:"analyse",label:"Analyse"},{id:"timeline",label:"Timeline"},{id:"emails",label:"Emails"},{id:"coaching",label:"Coaching"}];

  return (
    <div style={{minHeight:"100vh",background:C.bg}}>
      {/* Subtle grid background */}
      <div style={{position:"fixed",inset:0,backgroundImage:`linear-gradient(${C.border} 1px,transparent 1px),linear-gradient(90deg,${C.border} 1px,transparent 1px)`,backgroundSize:"40px 40px",pointerEvents:"none",zIndex:0}}/>
      {/* Accent glow */}
      <div style={{position:"fixed",top:-200,right:-200,width:600,height:600,background:`radial-gradient(circle, ${C.accentDim} 0%, transparent 70%)`,pointerEvents:"none",zIndex:0}}/>

      <div style={{position:"relative",zIndex:1}}>
        {/* Header */}
        <div style={{borderBottom:`1px solid ${C.border}`,padding:"16px 32px",display:"flex",alignItems:"center",gap:16,background:"rgba(8,8,16,0.8)",backdropFilter:"blur(12px)",position:"sticky",top:0,zIndex:20}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:36,height:36,borderRadius:8,background:C.accent,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <div>
              <div style={{fontSize:14,fontWeight:800,letterSpacing:"0.04em",fontFamily:"'Syne',sans-serif",color:C.text}}>SALES COACH <span style={{color:C.accent}}>AI</span></div>
              <div style={{fontSize:10,color:C.muted,letterSpacing:"0.08em"}}>ANALYSE D'APPELS COMMERCIAUX</div>
            </div>
          </div>
          <div style={{marginLeft:"auto",display:"flex",gap:10,alignItems:"center"}}>
            {phase!=="idle"&&phase!=="err"&&<button onClick={reset} style={{background:"transparent",border:`1px solid ${C.border}`,color:C.muted,fontSize:10,padding:"6px 14px",borderRadius:6,cursor:"pointer",fontFamily:"'Syne',sans-serif",fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase",transition:"all .2s"}}
              onMouseOver={e=>{e.currentTarget.style.borderColor=C.borderHi;e.currentTarget.style.color=C.text}}
              onMouseOut={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.muted}}>← Nouveau</button>}
            <div style={{background:C.accentDim,border:`1px solid ${C.accentBorder}`,color:C.accent,fontSize:9,padding:"5px 12px",borderRadius:5,letterSpacing:"0.12em",textTransform:"uppercase",fontWeight:700,fontFamily:"'Syne',sans-serif"}}>PRO</div>
          </div>
        </div>

        <div style={{maxWidth:960,margin:"0 auto",padding:"40px 24px"}}>

          {/* IDLE */}
          {phase==="idle"&&(
            <div>
              <div className="fu" style={{marginBottom:48,textAlign:"center"}}>
                <div style={{fontSize:11,color:C.accent,letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:16,fontFamily:"'Syne',sans-serif",fontWeight:600}}>● LIVE DEMO</div>
                <h1 style={{fontSize:48,fontWeight:800,fontFamily:"'Syne',sans-serif",lineHeight:1.1,marginBottom:16}}>
                  Analysez vos appels<br/><span style={{color:C.accent}}>en secondes.</span>
                </h1>
                <p style={{fontSize:14,color:C.muted,maxWidth:480,margin:"0 auto",lineHeight:1.7}}>Score, objections, timeline, coaching personnalisé et séquence email — générés automatiquement.</p>
              </div>

              <div className="fu2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24}}>
                <button onClick={()=>fileRef.current?.click()} style={{...card({cursor:"pointer",textAlign:"center",padding:"28px 24px",border:`1px solid ${C.border}`,background:C.s2,display:"block",width:"100%",fontFamily:"'DM Mono',monospace",color:C.text,transition:"all .2s"}),}}
                  onMouseOver={e=>{e.currentTarget.style.borderColor=C.accentBorder;e.currentTarget.style.background=C.s3}}
                  onMouseOut={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.s2}}>
                  <div style={{fontSize:28,marginBottom:10}}>📁</div>
                  <div style={{fontSize:13,fontWeight:600,fontFamily:"'Syne',sans-serif",marginBottom:4}}>Uploader un audio</div>
                  <div style={{fontSize:11,color:C.muted}}>MP3, WAV, M4A, WEBM</div>
                </button>
                <div style={{...card({background:C.s2,padding:"28px 24px"})}}>
                  <div style={{fontSize:11,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10,fontFamily:"'Syne',sans-serif",fontWeight:600}}>Ou coller la transcription</div>
                  <textarea value={transcript} onChange={e=>setTranscript(e.target.value)}
                    placeholder="Collez ici la transcription de l'appel..."
                    style={{width:"100%",minHeight:80,background:"rgba(0,0,0,0.3)",border:`1px solid ${C.border}`,borderRadius:8,color:C.text,padding:"12px 14px",fontSize:12,fontFamily:"'DM Mono',monospace",resize:"none",outline:"none",lineHeight:1.7,boxSizing:"border-box"}}
                    onFocus={e=>e.target.style.borderColor=C.borderHi}
                    onBlur={e=>e.target.style.borderColor=C.border}
                  />
                </div>
              </div>
              <input ref={fileRef} type="file" accept="audio/*" style={{display:"none"}} onChange={onFile}/>

              {(audioBlob||transcript.trim())&&(
                <div className="fu3" style={{textAlign:"center"}}>
                  {audioBlob&&<div style={{fontSize:12,color:C.green,marginBottom:12}}>✓ {audioBlob.name} chargé</div>}
                  <button onClick={analyze} style={{
                    background:C.accent,color:"#fff",border:"none",
                    padding:"14px 40px",borderRadius:8,fontSize:13,fontWeight:700,
                    cursor:"pointer",letterSpacing:"0.08em",textTransform:"uppercase",
                    fontFamily:"'Syne',sans-serif",transition:"all .2s",
                    boxShadow:`0 8px 32px ${C.accentDim}`,
                  }}
                    onMouseOver={e=>e.currentTarget.style.transform="translateY(-2px)"}
                    onMouseOut={e=>e.currentTarget.style.transform="translateY(0)"}
                  >⚡ Analyser l'appel</button>
                </div>
              )}

              {/* Feature pills */}
              <div className="fu4" style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap",marginTop:40}}>
                {["Score /10","Timeline","3 Emails","Coaching IA","Objections","Closing %"].map((f,i)=>(
                  <span key={i} style={{fontSize:11,padding:"6px 14px",background:C.s2,border:`1px solid ${C.border}`,color:C.muted,borderRadius:20,fontFamily:"'DM Mono',monospace"}}>{f}</span>
                ))}
              </div>
            </div>
          )}

          {/* PROCESSING */}
          {phase==="processing"&&(
            <div style={{textAlign:"center",padding:"80px 0"}}>
              <div style={{...card({display:"inline-block",padding:"48px 64px",minWidth:320})}}>
                <div style={{width:48,height:48,border:`2px solid ${C.accent}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin .8s linear infinite",margin:"0 auto 24px"}}/>
                <div style={{fontSize:16,fontWeight:700,fontFamily:"'Syne',sans-serif",marginBottom:8}}>Analyse en cours…</div>
                <div style={{fontSize:11,color:C.muted,letterSpacing:"0.1em",textTransform:"uppercase"}}>Score · Timeline · Emails · Coaching</div>
              </div>
            </div>
          )}

          {/* ERROR */}
          {phase==="err"&&(
            <div style={{...card({borderColor:C.accentBorder,maxWidth:400,margin:"80px auto",padding:"32px",textAlign:"center"})}}>
              <div style={{fontSize:24,marginBottom:16}}>⚠️</div>
              <div style={{color:C.accent,fontSize:13,marginBottom:20,fontFamily:"'Syne',sans-serif",fontWeight:600}}>{errMsg}</div>
              <button onClick={reset} style={{background:C.accent,color:"#fff",border:"none",padding:"10px 24px",borderRadius:6,fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"'Syne',sans-serif"}}>Réessayer</button>
            </div>
          )}

          {/* RESULTS */}
          {phase==="done"&&result&&(
            <div>
              {/* KPI cards */}
              <div className="fu" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:24}}>
                <div style={card()}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div>
                      <div style={{fontSize:10,color:C.muted,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:8,fontFamily:"'Syne',sans-serif",fontWeight:600}}>Score d'appel</div>
                      <div style={{fontSize:36,fontWeight:800,color:sc(result.analyse.score),fontFamily:"'Syne',sans-serif",lineHeight:1}}>{result.analyse.score}<span style={{fontSize:14,color:C.dim}}>/10</span></div>
                      <Bar v={result.analyse.score} max={10} color={sc(result.analyse.score)}/>
                      <div style={{fontSize:11,color:C.muted,marginTop:10,lineHeight:1.5}}>{result.analyse.score_justification}</div>
                    </div>
                    <ScoreRing value={result.analyse.score} max={10} color={sc(result.analyse.score)}/>
                  </div>
                </div>
                <div style={card()}>
                  <div style={{fontSize:10,color:C.muted,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:8,fontFamily:"'Syne',sans-serif",fontWeight:600}}>Probabilité closing</div>
                  <div style={{fontSize:36,fontWeight:800,color:sc(result.analyse.probabilite_closing,100),fontFamily:"'Syne',sans-serif",lineHeight:1}}>{result.analyse.probabilite_closing}<span style={{fontSize:14,color:C.dim}}>%</span></div>
                  <Bar v={result.analyse.probabilite_closing} max={100} color={sc(result.analyse.probabilite_closing,100)}/>
                  <div style={{fontSize:11,color:C.muted,marginTop:10,lineHeight:1.5}}>{result.analyse.proba_justification}</div>
                </div>
                <div style={card()}>
                  <div style={{fontSize:10,color:C.muted,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:8,fontFamily:"'Syne',sans-serif",fontWeight:600}}>Objections</div>
                  <div style={{fontSize:36,fontWeight:800,color:C.gold,fontFamily:"'Syne',sans-serif",lineHeight:1}}>{(result.analyse.objections||[]).length}<span style={{fontSize:14,color:C.dim}}> détectées</span></div>
                  <div style={{marginTop:14}}>
                    {(result.analyse.objections||[]).map((o,i)=><Tag key={i} color={C.accent} bg={C.accentDim} border={C.accentBorder}>{o}</Tag>)}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="fu2" style={{display:"flex",gap:0,marginBottom:20,borderBottom:`1px solid ${C.border}`}}>
                {TABS.map(t=>(
                  <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{
                    background:"transparent",border:"none",
                    borderBottom:`2px solid ${activeTab===t.id?C.accent:"transparent"}`,
                    color:activeTab===t.id?C.text:C.muted,
                    fontSize:12,padding:"10px 20px",cursor:"pointer",
                    fontFamily:"'Syne',sans-serif",fontWeight:activeTab===t.id?700:400,
                    letterSpacing:"0.06em",textTransform:"uppercase",
                    transition:"all .15s",marginBottom:-1,
                  }}>{t.label}</button>
                ))}
              </div>

              {activeTab==="analyse"&&(
                <div className="fu">
                  <div style={{...card({marginBottom:16})}}>
                    <SH>Résumé de l'appel</SH>
                    <p style={{fontSize:13,color:"#C0C0DA",lineHeight:1.85}}>{result.analyse.resume}</p>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                    <div style={card()}>
                      <SH>Objections détectées</SH>
                      {(result.analyse.objections||[]).map((o,i)=><Tag key={i} color={C.accent} bg={C.accentDim} border={C.accentBorder}>{o}</Tag>)}
                    </div>
                    <div style={card()}>
                      <SH>Points forts</SH>
                      {(result.analyse.points_forts||[]).map((p,i)=><Tag key={i} color={C.green} bg={C.greenDim} border={C.greenBorder}>{p}</Tag>)}
                    </div>
                  </div>
                </div>
              )}

              {activeTab==="timeline"&&(
                <div className="fu" style={card()}>
                  <SH>Moments clés de l'appel</SH>
                  <Timeline moments={result.analyse.moments}/>
                </div>
              )}

              {activeTab==="emails"&&(
                <div className="fu" style={card()}>
                  <SH>Séquence de relance</SH>
                  <EmailTabs emails={result.analyse.emails}/>
                </div>
              )}

              {activeTab==="coaching"&&(
                <div className="fu">
                  <div style={{...card({borderColor:C.goldBorder,marginBottom:16})}}>
                    <SH>Coaching personnalisé</SH>
                    <p style={{fontSize:13,color:"#C0C0DA",lineHeight:1.9}}>{result.analyse.coaching}</p>
                  </div>
                  <div style={card()}>
                    <SH>Transcription</SH>
                    <div style={{fontSize:12,color:C.muted,lineHeight:1.8,maxHeight:240,overflow:"auto",whiteSpace:"pre-wrap"}}>{result.transcription}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><App/></React.StrictMode>
);
