import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // 로깅
  const krwDate = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  console.log(`[${krwDate}] ${req.url}`);
}

export const config = {
  matcher: ['/', '/market/:path*'],
};
