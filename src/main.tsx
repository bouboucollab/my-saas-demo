import React, { useState, useRef } from "react";
import ReactDOM from "react-dom/client";

const KF = `
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
body{background:#05050A;color:#ECECF1;font-family:'Geist',system-ui,sans-serif;-webkit-font-smoothing:antialiased;font-feature-settings:'ss01','ss02'}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes fu{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes fi{from{opacity:0}to{opacity:1}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes dash{to{stroke-dashoffset:0}}
.a1{animation:fu .5s cubic-bezier(.16,1,.3,1) both}
.a2{animation:fu .5s .08s cubic-bezier(.16,1,.3,1) both}
.a3{animation:fu .5s .16s cubic-bezier(.16,1,.3,1) both}
.a4{animation:fu .5s .24s cubic-bezier(.16,1,.3,1) both}
.ai{animation:fi .35s ease both}
.ch{transition:border-color .2s,background .2s,transform .2s,box-shadow .2s}
.ch:hover{border-color:rgba(255,255,255,.12)!important;transform:translateY(-1px);box-shadow:0 8px 32px rgba(0,0,0,.4)!important}
.tb{transition:color .15s,border-color .15s}
`;

const T = {
  bg:"#05050A",
  s1:"#0A0A12",
  s2:"#0F0F18",
  b:"rgba(255,255,255,0.055)",
  bm:"rgba(255,255,255,0.09)",
  bh:"rgba(255,255,255,0.15)",
  i:"#7C3AED",
  ig:"linear-gradient(135deg,#7C3AED 0%,#5B21B6 100%)",
  id:"rgba(124,58,237,0.1)",
  ib:"rgba(124,58,237,0.25)",
  g:"#059669",
  gd:"rgba(5,150,105,0.1)",
  gb:"rgba(5,150,105,0.22)",
  a:"#D97706",
  ad:"rgba(217,119,6,0.1)",
  ab:"rgba(217,119,6,0.22)",
  r:"#DC2626",
  rd:"rgba(220,38,38,0.08)",
  rb:"rgba(220,38,38,0.2)",
  t1:"#ECECF1",
  t2:"#9090A0",
  t3:"#50505F",
};

const c=(x={})=>({background:T.s1,border:`1px solid ${T.b}`,borderRadius:12,padding:"22px 26px",...x});

const Pip=({color,bg,bd,children})=>(
  <span className="ch" style={{display:"inline-flex",alignItems:"center",fontSize:11.5,padding:"3px 10px",background:bg,border:`1px solid ${bd}`,color,borderRadius:6,marginRight:7,marginBottom:7,fontWeight:500,letterSpacing:"0.01em",cursor:"default"}}>{children}</span>
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
        transform="rotate(-90 38 38)" style={{transition:"stroke-dashoffset 1.3s cubic-bezier(.16,1,.3,1)"}}/>
      <text x="38" y="43" textAnchor="middle" fill={color} fontSize="15" fontWeight="600" fontFamily="'Geist',sans-serif">{v}</text>
    </svg>
  );
};

const Bar=({v,max=100,color})=>(
  <div style={{height:3,background:"rgba(255,255,255,0.04)",borderRadius:2,overflow:"hidden",marginTop:8}}>
    <div style={{height:"100%",borderRadius:2,background:color,width:`${Math.min(100,(v/max)*100)}%`,transition:"width 1.3s cubic-bezier(.16,1,.3,1)"}}/>
  </div>
);

function Emails({emails}){
  const [t,setT]=useState(0);
  const [cp,setCp]=useState(false);
  const tabs=[{l:"J+1",c:T.g},{l:"J+3",c:T.a},{l:"J+7",c:T.i}];
  if(!emails?.length)return null;
  const copy=()=>{navigator.clipboard.writeText(`${emails[t]?.sujet}\n\n${emails[t]?.corps}`);setCp(true);setTimeout(()=>setCp(false),2000);};
  return(
    <div>
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

function TL({moments}){
  if(!moments?.length)return null;
  const col=(d)=>{const l=d.toLowerCase();return l.includes("objection")||l.includes("prix")||l.includes("refus")?T.r:l.includes("accord")||l.includes("intérêt")||l.includes("closing")?T.g:T.a;};
  return(
    <div style={{position:"relative",paddingLeft:26}}>
      <div style={{position:"absolute",left:9,top:6,bottom:6,width:"1px",background:`linear-gradient(to bottom,${T.i},${T.g}40)`}}/>
      {moments.map((m,i)=>(
        <div key={i} style={{display:"flex",gap:14,marginBottom:20,position:"relative"}}>
          <div style={{position:"absolute",left:-26,top:5,width:9,height:9,borderRadius:"50%",background:col(m.description),border:`1.5px solid ${T.s1}`,flexShrink:0}}/>
          <div style={{minWidth:40,fontSize:11,color:T.t3,fontVariantNumeric:"tabular-nums",paddingTop:1,fontWeight:500}}>{m.time}</div>
          <div style={{fontSize:13,color:T.t2,lineHeight:1.6}}>{m.description}</div>
        </div>
      ))}
    </div>
  );
}

function Loader(){
  const [s,setS]=useState(0);
  const steps=["Analyse de la transcription","Détection des signaux commerciaux","Génération de la séquence emails"];
  React.useEffect(()=>{const t1=setTimeout(()=>setS(1),1400);const t2=setTimeout(()=>setS(2),3000);return()=>{clearTimeout(t1);clearTimeout(t2);};},[]);
  return(
    <div style={{display:"flex",justifyContent:"center",padding:"80px 0"}}>
      <div style={{...c({padding:"40px 48px",minWidth:360,textAlign:"center"})}}>
        <div style={{width:40,height:40,border:`1.5px solid ${T.i}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin .75s linear infinite",margin:"0 auto 28px"}}/>
        <div style={{fontSize:15,fontWeight:500,marginBottom:6,color:T.t1}}>Analyse en cours</div>
        <div style={{fontSize:13,color:T.t3,marginBottom:32}}>Traitement par IA avancée</div>
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
      const{transcription}=await fetch("/api/transcribe",{method:"POST"}).then(r=>r.json());
      const analyse=await fetch("/api/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({transcription})}).then(r=>r.json());
      const email=await fetch("/api/email",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({transcription,analyse})}).then(r=>r.json());
      setRes({transcription,analyse,email});
      setPh("done");setTab("analyse");
    }catch(e){setErr("Erreur de connexion.");setPh("err");}
  };

  const reset=()=>{setPh("idle");setRes(null);setTx("");setAb(null);setErr("");};
  const sc=(v,m=10)=>v/m>=.7?T.g:v/m>=.5?T.a:T.r;
  const TABS=[{id:"analyse",l:"Analyse"},{id:"timeline",l:"Timeline"},{id:"emails",l:"Emails"},{id:"coaching",l:"Coaching"}];

  return(
    <div style={{minHeight:"100vh",background:T.bg}}>
      <style>{KF}</style>
      <div style={{position:"fixed",inset:0,background:"radial-gradient(ellipse 60% 40% at 50% -10%,rgba(124,58,237,.08) 0%,transparent 70%)",pointerEvents:"none",zIndex:0}}/>

      <div style={{position:"relative",zIndex:1}}>
        {/* Nav */}
        <nav style={{height:56,borderBottom:`1px solid ${T.b}`,padding:"0 28px",display:"flex",alignItems:"center",gap:10,background:"rgba(5,5,10,.8)",backdropFilter:"blur(20px)",position:"sticky",top:0,zIndex:20}}>
          <div style={{width:26,height:26,borderRadius:6,background:T.ig,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          </div>
          <span style={{fontSize:14,fontWeight:600,letterSpacing:"-0.01em",color:T.t1}}>SalesCoach</span>
          <span style={{fontSize:10,background:T.id,border:`1px solid ${T.ib}`,color:T.i,padding:"2px 7px",borderRadius:4,fontWeight:600,letterSpacing:"0.08em"}}>PRO</span>
          <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:11,color:T.t3,display:"flex",alignItems:"center",gap:5}}>
              <span style={{width:5,height:5,borderRadius:"50%",background:T.g,display:"inline-block"}}/>
              Opérationnel
            </span>
            {ph!=="idle"&&ph!=="err"&&<button onClick={reset} className="ch" style={{background:"transparent",border:`1px solid ${T.b}`,color:T.t2,fontSize:11,padding:"5px 12px",borderRadius:6,cursor:"pointer",fontWeight:500}}>← Nouveau</button>}
          </div>
        </nav>

        <div style={{maxWidth:920,margin:"0 auto",padding:"52px 24px"}}>

          {/* IDLE */}
          {ph==="idle"&&(
            <div>
              <div className="a1" style={{marginBottom:52}}>
                <div style={{display:"inline-flex",alignItems:"center",gap:7,background:T.id,border:`1px solid ${T.ib}`,borderRadius:20,padding:"5px 14px",marginBottom:20}}>
                  <span style={{width:5,height:5,borderRadius:"50%",background:T.i,animation:"pulse 2s ease infinite"}}/>
                  <span style={{fontSize:11,color:T.i,fontWeight:500,letterSpacing:"0.08em"}}>SALES INTELLIGENCE</span>
                </div>
                <h1 style={{fontSize:46,fontWeight:700,lineHeight:1.1,letterSpacing:"-0.03em",color:T.t1,marginBottom:16,maxWidth:560}}>
                  Analysez chaque appel.<br/>
                  <span style={{background:"linear-gradient(135deg,#7C3AED,#4F46E5)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Closez plus.</span>
                </h1>
                <p style={{fontSize:15,color:T.t2,lineHeight:1.7,maxWidth:440,fontWeight:300}}>Score, objections, coaching expert et séquence emails — en quelques secondes.</p>
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
                  <div style={{fontSize:13,fontWeight:500,color:ab?T.g:T.t1}}>{ab?ab.name:"Uploader un audio"}</div>
                  <div style={{fontSize:12,color:T.t3}}>{ab?"Fichier chargé":"Glissez ou cliquez · MP3, WAV, M4A"}</div>
                </div>

                <div className="ch" style={c({padding:"24px",minHeight:160})}>
                  <div style={{fontSize:11,color:T.t3,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10,fontWeight:500}}>Transcription</div>
                  <textarea value={tx} onChange={e=>setTx(e.target.value)}
                    placeholder="Collez la transcription de l'appel..."
                    style={{width:"100%",height:90,background:"transparent",border:"none",color:T.t1,padding:0,fontSize:13,fontFamily:"inherit",resize:"none",outline:"none",lineHeight:1.7,boxSizing:"border-box"}}
                  />
                </div>
              </div>
              <input ref={fr} type="file" accept="audio/*" style={{display:"none"}} onChange={onFile}/>

              {(ab||tx.trim())&&(
                <div className="a3" style={{marginBottom:40}}>
                  <button onClick={analyze} className="ch" style={{
                    background:T.ig,color:"#fff",border:"none",
                    padding:"12px 36px",borderRadius:8,fontSize:13,fontWeight:500,
                    cursor:"pointer",letterSpacing:"0.02em",fontFamily:"inherit",
                    boxShadow:"0 4px 24px rgba(124,58,237,.3)",
                  }}>Analyser l'appel →</button>
                </div>
              )}

              <div className="a4" style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {["Score /10","Closing %","Objections","Points forts","3 Emails","Coaching","Timeline"].map((f,i)=>(
                  <span key={i} style={{fontSize:11.5,padding:"5px 13px",background:"transparent",border:`1px solid ${T.b}`,color:T.t3,borderRadius:6,fontWeight:400}}>{f}</span>
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
              <div className="a1" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
                <div className="ch" style={c()}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div style={{flex:1,marginRight:16}}>
                      <div style={{fontSize:10,color:T.t3,letterSpacing:"0.13em",textTransform:"uppercase",marginBottom:10,fontWeight:500}}>Score</div>
                      <div style={{fontSize:38,fontWeight:700,color:sc(res.analyse.score),lineHeight:1,letterSpacing:"-0.02em"}}>{res.analyse.score}<span style={{fontSize:14,color:T.t3,fontWeight:400}}>/10</span></div>
                      <Bar v={res.analyse.score} max={10} color={sc(res.analyse.score)}/>
                      <div style={{fontSize:12,color:T.t2,marginTop:9,lineHeight:1.5}}>{res.analyse.score_justification}</div>
                    </div>
                    <Ring v={res.analyse.score} max={10} color={sc(res.analyse.score)}/>
                  </div>
                </div>
                <div className="ch" style={c()}>
                  <div style={{fontSize:10,color:T.t3,letterSpacing:"0.13em",textTransform:"uppercase",marginBottom:10,fontWeight:500}}>Closing</div>
                  <div style={{fontSize:38,fontWeight:700,color:sc(res.analyse.probabilite_closing,100),lineHeight:1,letterSpacing:"-0.02em"}}>{res.analyse.probabilite_closing}<span style={{fontSize:14,color:T.t3,fontWeight:400}}>%</span></div>
                  <Bar v={res.analyse.probabilite_closing} max={100} color={sc(res.analyse.probabilite_closing,100)}/>
                  <div style={{fontSize:12,color:T.t2,marginTop:9,lineHeight:1.5}}>{res.analyse.proba_justification}</div>
                </div>
                <div className="ch" style={c()}>
                  <div style={{fontSize:10,color:T.t3,letterSpacing:"0.13em",textTransform:"uppercase",marginBottom:10,fontWeight:500}}>Objections</div>
                  <div style={{fontSize:38,fontWeight:700,color:T.a,lineHeight:1,letterSpacing:"-0.02em"}}>{(res.analyse.objections||[]).length}<span style={{fontSize:14,color:T.t3,fontWeight:400}}> {(res.analyse.objections||[]).length>1?"détectées":"détectée"}</span></div>
                  <div style={{marginTop:12}}>
                    {(res.analyse.objections||[]).slice(0,2).map((o,i)=><Pip key={i} color={T.r} bg={T.rd} bd={T.rb}>{o}</Pip>)}
                  </div>
                </div>
              </div>

              <div className="a2" style={{display:"flex",borderBottom:`1px solid ${T.b}`,marginBottom:16}}>
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
                    <Div label="Résumé" accent/>
                    <p style={{fontSize:14,color:T.t2,lineHeight:1.85,fontWeight:300}}>{res.analyse.resume}</p>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                    <div className="ch" style={c()}>
                      <Div label="Objections" accent/>
                      {(res.analyse.objections||[]).map((o,i)=><Pip key={i} color={T.r} bg={T.rd} bd={T.rb}>⚠ {o}</Pip>)}
                    </div>
                    <div className="ch" style={c()}>
                      <Div label="Points forts" accent/>
                      {(res.analyse.points_forts||[]).map((p,i)=><Pip key={i} color={T.g} bg={T.gd} bd={T.gb}>✓ {p}</Pip>)}
                    </div>
                  </div>
                </div>
              )}

              {tab==="timeline"&&(
                <div className="ch ai" style={c()}>
                  <Div label="Moments clés" accent/>
                  <TL moments={res.analyse.moments}/>
                </div>
              )}

              {tab==="emails"&&(
                <div className="ch ai" style={c()}>
                  <Div label="Séquence de relance" accent/>
                  <Emails emails={res.analyse.emails}/>
                </div>
              )}

              {tab==="coaching"&&(
                <div className="ai">
                  <div className="ch" style={{...c({marginBottom:12,borderColor:T.ib,background:T.id})}}>
                    <Div label="Coaching" accent/>
                    <p style={{fontSize:14,color:T.t2,lineHeight:1.9,fontWeight:300}}>{res.analyse.coaching}</p>
                  </div>
                  <div className="ch" style={c()}>
                    <Div label="Transcription"/>
                    <div style={{fontSize:12.5,color:T.t3,lineHeight:1.8,maxHeight:240,overflow:"auto",whiteSpace:"pre-wrap"}}>{res.transcription}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{borderTop:`1px solid ${T.b}`,padding:"16px 28px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:11,color:T.t3}}>SalesCoach AI</span>
          <span style={{fontSize:11,color:T.t3,display:"flex",alignItems:"center",gap:6}}><span style={{width:4,height:4,borderRadius:"50%",background:T.g,display:"inline-block"}}/>Tous systèmes opérationnels</span>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><App/></React.StrictMode>
);
