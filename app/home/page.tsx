'use client'
import { useState, useEffect } from "react";
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

  const renderSVG = () => {
    if(result[0]['label']){
      switch (result[0]['label']) {
        case 'Positive':
          return(
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#33cc33" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="feather feather-smile"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
          )
        case 'Negative':
          return(
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#cc0000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="feather feather-frown"><circle cx="12" cy="12" r="10"></circle><path d="M16 16s-1.5-2-4-2-4 2-4 2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
          )
        case 'Neutral':
            return(
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffcc00" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="feather feather-meh"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="15" x2="16" y2="15"></line><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
            )
        default:
          return;
      }
    }
  }


  return(
    <main className="flex min-h-screen flex-col items-center justify-center p-12 lg:w-full">
      <h1 className="text-5xl font-bold mb-2 text-center text-slate-900">Hello, Dani</h1>
      <h2 className="text-2xl mb-4 text-center text-slate-600">Just a quick check in</h2>
      <form action={formAction} className="w-1/2 flex flex-col items-center">
        <div className="flex w-full">
          <input
            type="text"
            id="search_text"
            name="search_text"
            className="w-full p-2 border border-gray-300 rounded mb-4 text-slate-800"
            placeholder="Enter text here"
            onChange={handleChange}
          />
          <button onClick={e => searchClassification(e)} className="-translate-x-8 -translate-y-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-arrow-up"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
          </button>
        </div>
        {state?.errors?.search_text &&
          state?.errors?.search_text.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        <input type="hidden" id="score" name="score" value={result[0]['score']}/>
        <input type="hidden" id="sentiment" name="sentiment" value={result[0]['label']}/>
        {state?.errors?.score &&
          state?.errors?.score.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        <div className="flex items-center">
          <button type="submit" className="rounded-sm px-4 bg-slate-300 text-slate-900 h-10" disabled={!result[0]['label']}>Save To DB</button>
        </div>
      </form>

      {ready !== null && (
        <pre className="bg-gray-100 mt-2 p-2 rounded text-slate-900 items-center flex flex-col">
          {
            (!ready || !result) ? 'Loading...' : `The Sentiment is : ${result[0]['label']}`}
          {renderSVG()}
        </pre>
      )}
      {state !== null && state.message !== '' && (
        <pre className="bg-gray-100 mt-2 p-2 rounded text-slate-900">
          {state?.message}
        </pre>
      )}
    </main>
  )
} 