import { Spacing } from '@/src/shared/uiKit';
import { MainHeader } from '@/src/widgets/MainHeader';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainHeader />
      <main className="min-h-[calc(100vh-var(--spacing-main-header))] w-full flex-col items-center">
        {children}
        <Spacing className={`safe-bottom`} size={20} />
      </main>
    </>
  );
};
