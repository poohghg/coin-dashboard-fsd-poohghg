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

    if (!response.ok) {
      throw new Error(`Upbit API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
