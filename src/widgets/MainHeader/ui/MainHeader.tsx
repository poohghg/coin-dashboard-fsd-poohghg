import { ROUTERS } from '@/src/app/constant/router';
import Link from 'next/link';

export function MainHeader() {
  return (
    <header className={`h-main-header safe-top sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm`}>
      <div className={`flex h-full items-center justify-between px-3`}>
        <Link className="flex items-center space-x-2" href={ROUTERS.home()}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <span className="text-[15px] font-bold text-white">C</span>
          </div>
          <h1 className="text-[15px] font-bold text-gray-900">COIN Portfolio</h1>
        </Link>
        {/*<Navbar />*/}
      </div>
    </header>
  );
}
