"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const [keyword, setKeyword] = useState("");
  const [hook, setHook] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const generate = async () => {
    setMsg("");
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keyword })
    });
    const data = await res.json();
    if (res.ok) {
      setHook(data.hook);
      setScore(data.score);
    } else {
      setMsg(data.error || "Failed");
    }
  };

  const submitEmail = async () => {
    setMsg("");
    const res = await fetch("/api/interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    setMsg(res.ok ? "Thanks! We’ll notify you." : data.error || "Failed");
    if (res.ok) setEmail("");
  };

  return (
    <main className="container">
      <h1>Hook Generator</h1>
      <p className="small">Generate viral hooks instantly.</p>

      <div className="card">
        <input
          placeholder="Enter a keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div style={{ marginTop: 12 }}>
          <button onClick={generate}>Generate</button>
        </div>
        {hook && (
          <div className="card" style={{ marginTop: 16 }}>
            <div><strong>Hook</strong></div>
            <div style={{ marginTop: 8 }}>{hook}</div>
            <div style={{ marginTop: 12 }}>
              <strong>Viral Score:</strong> {score}
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <h3>Buy Access</h3>
        <p className="small">Leave your email to get notified.</p>
        <div className="row">
          <input
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={submitEmail}>Submit</button>
        </div>
        {msg && <p className="small" style={{ marginTop: 8 }}>{msg}</p>}
      </div>

      <div className="card">
        {!session ? (
          <button onClick={() => signIn("google")}>Sign in with Google</button>
        ) : (
          <div className="row">
            <button onClick={() => signOut()}>Sign out</button>
            <a href="/admin">Go to Admin</a>
          </div>
        )}
      </div>
    </main>
  );
}