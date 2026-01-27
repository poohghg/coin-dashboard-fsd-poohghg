import MainLayout from '@/app/(MainLayout)/layout';
import Link from 'next/link';

export default function NotFound() {
  return (
    <MainLayout>
      <div className={'flex h-full flex-col items-center justify-center py-10'}>
        <h2 className={'mb-4 text-2xl font-bold'}>페이지를 찾지 못했어요</h2>
        <p className={'mb-6 text-center text-gray-500'}>
          요청하신 페이지가 존재하지 않거나, 이동된 페이지일 수 있습니다.
        </p>
        <Link className={'rounded bg-sky-500 px-4 py-2 text-white transition'} href="/">
          홈으로 가기
        </Link>
      </div>
    </MainLayout>
  );
}
