import React, { useState, useRef } from "react";
import ReactDOM from "react-dom/client";

const C = { bg:"#0A0A12", red:"#E8492E", green:"#22C97A", amber:"#F0A034", blue:"#4A9EF0", text:"#EAEAF5", muted:"#7A7A90" };

const Spinner = () => (
  <div style={{width:32,height:32,border:`2px solid ${C.red}`,borderTopColor:"transparent",borderRadius:"50%",animation:"spin .7s linear infinite",margin:"0 auto"}}/>
);

function App() {
  const [phase, setPhase] = useState("idle");
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState<any>(null);
  const [errMsg, setErrMsg] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob|null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const onFile = (e:any) => {
    const f = e.target.files[0];
    if(!f) return;
    setAudioBlob(f);
  };

  const analyze = async () => {
    setPhase("processing");
    try {
      const { transcription } = await fetch("/api/transcribe", { method:"POST" }).then(r=>r.json());
      const analyse = await fetch("/api/analyze", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ transcription })
      }).then(r=>r.json());
      const email = await fetch("/api/email", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ transcription, analyse })
      }).then(r=>r.json());
      setResult({ transcription, analyse, email });
      setPhase("done");
    } catch(e:any) {
      setErrMsg("Erreur démo.");
      setPhase("err");
    }
  };

  const reset = () => { setPhase("idle"); setResult(null); setTranscript(""); setAudioBlob(null); };

  return (
    <div style={{fontFamily:"sans-serif",background:C.bg,color:C.text,minHeight:"100vh",padding:20}}>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
      <h1>Sales Coach AI — Démo gratuite</h1>
      {phase==="idle" && (
        <>
          <input ref={fileRef} type="file" accept="audio/*" style={{display:"none"}} onChange={onFile}/>
          <button onClick={()=>fileRef.current?.click()}>Uploader audio</button>
          <br/>
          <textarea placeholder="Ou collez la transcription..." value={transcript} onChange={e=>setTranscript(e.target.value)} style={{width:"100%",height:100,marginTop:10}}/>
          <br/>
          <button onClick={analyze} disabled={!transcript && !audioBlob} style={{marginTop:10}}>Analyser</button>
        </>
      )}
      {phase==="processing" && <Spinner/>}
      {phase==="done" && result && (
        <div style={{marginTop:20}}>
          <h2>Transcription</h2>
          <pre>{result.transcription}</pre>
          <h2>Analyse</h2>
          <pre>{JSON.stringify(result.analyse,null,2)}</pre>
          <h2>Email généré</h2>
          <pre>{JSON.stringify(result.email,null,2)}</pre>
          <button onClick={reset}>Nouvelle démo</button>
        </div>
      )}
      {phase==="err" && <div style={{color:"red"}}>{errMsg} <button onClick={reset}>Réessayer</button></div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode><App /></React.StrictMode>
);
