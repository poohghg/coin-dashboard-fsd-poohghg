import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeframe = searchParams.get('timeframe'); // 'seconds', 'minutes/1' 등
  const market = searchParams.get('market');
  const count = searchParams.get('count');
  const to = searchParams.get('to');
  const upbitUrl = `https://api.upbit.com/v1/candles/${timeframe}?market=${market}&count=${count}${to ? `&to=${to}` : ''}`;

  try {
    const response = await fetch(upbitUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: `Upbit API error: ${data.name}` }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
