import { MainHeader } from '@/src/widgets/MainHeader';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainHeader />
      <main className={'flex min-h-[calc(100vh-64px)] w-full flex-col items-center'}>{children}</main>
    </>
  );
};
