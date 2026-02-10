import { ReactNode } from 'react';

interface SeverFetcherProps<S> {
  fetcher: () => Promise<S>;
  children: (data: S) => ReactNode;
  errorComponent?: (e: unknown) => ReactNode;
}

const ServerFetcher = async <S,>({ fetcher, children, errorComponent }: SeverFetcherProps<S>) => {
  try {
    const res = await fetcher();
    return children(res);
  } catch (error) {
    console.error('ServerFetcher error:', error);
    // 비동기 통신 자체의 실패나 throw된 res를 상위로 전파
    // throw error;
    // 서버컴포넌트는 대체 UI를 렌더링해야하 SSR 과정 또는 클라이언트 전환시 문제가 없음
    if (errorComponent) {
      return <>{errorComponent(error)}</>;
    }

    return <div className="mt-10 text-center">무엇가 문제가 발생했습니다.</div>;
  }
};

export default ServerFetcher;
