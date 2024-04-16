import { NextResponse } from 'next/server'
import PipelineSingleton from './pipeline.js';

export async function GET(request) {
    const text = request.nextUrl.searchParams.get('text');
    if (!text) {
        return NextResponse.json({
            error: 'Missing text parameter',
        }, { status: 400 });
    }
    // Get the classification pipeline. When called for the first time,
    // this will load the pipeline and cache it for future use.
    const values = ["Positive", "Negative", "Neutral"];
    const randomIndex = Math.floor(Math.random() * values.length);
    const score = Math.random() * text.length


    // // Actually perform the classification
    const result = [{
        label: values[randomIndex],
        score: score
    }];
    // const classifier = await PipelineSingleton.getInstance();

    // Actually perform the classification
    // const result = await classifier(text);

    return NextResponse.json(result);
}