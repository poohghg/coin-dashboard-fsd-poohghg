import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // 로깅
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip');
  const krwDate = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  console.log(`[${krwDate}] IP: ${ip}`);
}

export const config = {
  matcher: ['/', '/market/:path*'],
};
