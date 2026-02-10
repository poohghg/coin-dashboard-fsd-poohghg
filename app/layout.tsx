import getMetadata from '@/src/app/head/metadata';
import getViewPort from '@/src/app/head/viewport';
import { ClientRoot } from '@/src/app/ui';
import { ReactQueryProvider } from '@/src/shared/lib/reactQuery';
import { ToastList } from '@/src/shared/uiKit';
import { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = getMetadata();

export const viewport = getViewPort();

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        <RootComponent>{children}</RootComponent>
      </body>
    </html>
  );
}

const RootComponent = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <ReactQueryProvider>
      <ClientRoot>
        <div className={'relative isolate z-0 mx-auto flex max-w-[1200px] flex-col'}>{children}</div>
        <ToastList />
      </ClientRoot>
    </ReactQueryProvider>
  );
};
