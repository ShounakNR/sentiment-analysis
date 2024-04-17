import { NextResponse } from 'next/server'

export async function GET(request) {
    const text = request.nextUrl.searchParams.get('text');
    if (!text) {
        return NextResponse.json({
            error: 'Missing text parameter',
        }, { status: 400 });
    }
    const values = ["Positive", "Negative", "Neutral"];
    const randomIndex = Math.floor(Math.random() * values.length);
    const score = Math.random() * text.length

    const result = [{
        label: values[randomIndex],
        score: score
    }];
    return NextResponse.json(result);
}