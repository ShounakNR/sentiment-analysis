'use client'
import { useState } from "react";

export default function HomePage() {
  const [result, setResult] = useState(null);
  const [ready, setReady] = useState(null);

  const classify = async (text) => {
    if (!text) return;
    if (ready === null) setReady(false);

    // Make a request to the /classify route on the server.
    const result = await fetch(`/classify?text=${encodeURIComponent(text)}`);

    // If this is the first time we've made a request, set the ready flag.
    if (!ready) setReady(true);

    const json = await result.json();
    setResult(json);
  };
  return(
    <main className="flex min-h-screen flex-col items-center justify-center p-12 lg:w-full">
      <h1 className="text-5xl font-bold mb-2 text-center text-slate-900">Hello Dani</h1>
      <h2 className="text-2xl mb-4 text-center text-slate-600">Just a quick check in</h2>
      <input
        type="text"
        className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4 text-slate-800"
        placeholder="Enter text here"
        onInput={e => {
          classify(e.target.value);
        }}
      />

      {ready !== null && (
        <pre className="bg-gray-100 p-2 rounded">
          {
            (!ready || !result) ? 'Loading...' : JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  )
}