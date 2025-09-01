import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PASS = (import.meta as any).env?.VITE_TD_PASSCODE || "420";
const SUCCESS_TO_DEFAULT = "/portal?client=TD+Studio";

export default function TDGate() {
  const [sp] = useSearchParams();
  const successTo = sp.get("to") || SUCCESS_TO_DEFAULT;

  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const push = (d: string) => { setErr(""); setCode(v => (v + d).slice(0, 6)); };
  const del = () => setCode(v => v.slice(0, -1));
  const clr = () => { setCode(""); setErr(""); };

  const submit = () => {
    if (code === PASS) {
      sessionStorage.setItem("td_access_granted", "1");
      nav(successTo, { replace: true });
    } else {
      setErr("Incorrect code");
      setCode("");
    }
  };

  const keys = ["1","2","3","4","5","6","7","8","9","CLR","0","DEL"];

  return (
    <main style={{minHeight:"100vh",display:"grid",placeItems:"center",
      background:"radial-gradient(60% 60% at 50% 40%, rgba(255,255,255,0.06), rgba(0,0,0,0.9))",
      color:"#e5e5e5",padding:"2rem"}}>
      <div style={{width:340,maxWidth:"90vw",background:"rgba(0,0,0,0.45)",backdropFilter:"blur(12px)",
        border:"1px solid rgba(255,255,255,0.08)",borderRadius:20,padding:"24px 20px",boxShadow:"0 10px 30px rgba(0,0,0,0.5)"}}>
        <h1 style={{margin:"0 0 8px 0",fontSize:22,letterSpacing:1}}>TD Access</h1>
        <p style={{margin:"0 0 14px 0",opacity:0.7,fontSize:13}}>Enter access code to continue</p>

        <div style={{display:"flex",gap:8,marginBottom:14}}>
          {Array.from({length:3}).map((_,i)=>(
            <div key={i} style={{height:14,flex:1,borderRadius:999,background:i<code.length?"#e5e5e5":"#2a2a2a"}}/>
          ))}
        </div>

        {err && <div style={{color:"#ff6b6b",fontSize:12,marginBottom:10}}>{err}</div>}

        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {keys.map(k=>(
            <button key={k} onClick={()=>{
                if(k==="DEL") del(); else if(k==="CLR") clr(); else push(k);
              }}
              style={{height:64,borderRadius:14,border:"1px solid rgba(255,255,255,0.08)",
                background:"rgba(255,255,255,0.04)",fontSize:18,cursor:"pointer"}}>
              {k}
            </button>
          ))}
        </div>

        <button onClick={submit}
          style={{marginTop:12,width:"100%",height:48,borderRadius:14,
            border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.12)",fontSize:16,cursor:"pointer"}}>
          Enter
        </button>

        <div style={{marginTop:10,fontSize:11,opacity:0.55}}>
          Hint: set <code>VITE_TD_PASSCODE</code> in <code>.env</code>. Default is 420.
        </div>
      </div>
    </main>
  );
}