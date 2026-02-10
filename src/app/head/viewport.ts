import type { Viewport } from 'next';

export default function getViewPort(): Viewport {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    userScalable: false,
    themeColor: '#ffffff',
    // themeColor: [
    //   { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    //   { media: '(prefers-color-scheme: dark)', color: '#1c1c1c' },
    // ],
    viewportFit: 'cover',
  };
}
