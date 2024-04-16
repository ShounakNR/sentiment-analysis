'use client'
import { useState } from "react";
import { createEntry } from "../lib/actions";
import { useFormState } from "react-dom";

export default function HomePage() {
  const [result, setResult] = useState([{label: undefined, score: undefined}]);
  const [search,setSearch] = useState(null)
  const [ready, setReady] = useState<Boolean | any>(null);

  interface InitialState {
    errors: {
      userId?: string[] | undefined;
      search_text?: string[] | undefined;
      score?: string[] | undefined;
      sentiment?: string[] | undefined;
    };
    message: string;
  };

  const initialState = {
    message: ''
  }
  const [state, formAction] = useFormState(createEntry, initialState as InitialState);
  
  const classify = async (text: any) => {
    if (!text) return;
    if (ready === null) setReady(false);

    // Make a request to the /classify route on the server.
    const result = await fetch(`/classify?text=${encodeURIComponent(text)}`);

    // If this is the first time we've made a request, set the ready flag.
    if (!ready) setReady(true);

    const json = await result.json();
    setResult(json);
  };

  const handleChange = (event : any) => {
    setSearch(event.target.value)
  }

  const searchClassification = (e : any) => {
    e.preventDefault()
    if (search === null) {
      alert('Please input some text.')
    } else {
      classify(search)
    }
  }

  const saveResult = () => {
    console.log(result)
  }
  console.log(state)

  return(
    <main className="flex min-h-screen flex-col items-center justify-center p-12 lg:w-full">
      <h1 className="text-5xl font-bold mb-2 text-center text-slate-900">Hello Dani</h1>
      <h2 className="text-2xl mb-4 text-center text-slate-600">Just a quick check in</h2>
      <form action={formAction}>
        <input
          type="text"
          id="search_text"
          name="search_text"
          className="w-full max-w-xs p-2 border border-gray-300 rounded mb-4 text-slate-800"
          placeholder="Enter text here"
          onChange={handleChange}
        />
        {state.errors?.search_text &&
          state.errors.search_text.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        <input type="hidden" id="score" name="score" value={result[0]['score']}/>
        <input type="hidden" id="sentiment" name="sentiment" value={result[0]['label']}/>
        {state.errors?.score &&
          state.errors.score.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        <div className="flex space-x-5">
          <button onClick={e => searchClassification(e)} className="rounded-sm px-4 bg-slate-300 text-slate-900 h-10 "> Find Sentiment</button>
          <button type="submit" className="rounded-sm px-4 bg-slate-300 text-slate-900 h-10">Save To DB</button>
        </div>
      </form>

      {ready !== null && (
        <pre className="bg-gray-100 p-2 rounded text-slate-900">
          {
            (!ready || !result) ? 'Loading...' : JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  )
}