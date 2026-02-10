'use client';

import { useRouter } from 'next/navigation';

const RetryButton = () => {
  const router = useRouter();
  return (
    <button
      className="ml-2 rounded bg-blue-600 px-3 py-1 text-white transition hover:bg-blue-700"
      onClick={() => router.refresh()}
    >
      Retry
    </button>
  );
};

export default RetryButton;
