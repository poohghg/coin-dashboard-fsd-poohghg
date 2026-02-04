import { Navbar } from '@/src/widgets/MainHeader/ui/Navbar';
import Link from 'next/link';

export function MainHeader() {
  return (
    <header className={`sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm`}>
      <div className={`h-main-header flex items-center justify-between px-3`}>
        <Link className="flex items-center space-x-2" href="/">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <span className="text-[15px] font-bold text-white">C</span>
          </div>
          <h1 className="text-[15px] font-bold text-gray-900">COIN Portfolio</h1>
        </Link>
        <Navbar />
      </div>
    </header>
  );
}
