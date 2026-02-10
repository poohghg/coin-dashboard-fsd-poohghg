import getMetadata from '@/src/app/head/metadata';

const tabLabelMap: Record<string, string> = {
  orderbook: '호가',
  chart: '차트',
};

export async function generateMetadata({ params }: { params: Promise<{ market: string; tab: string }> }) {
  const { market, tab } = await params;

  const title = `${market} | ${tabLabelMap[tab]}`;
  const description = `${market}의 ${tabLabelMap[tab]} 정보를 확인해보세요.`;

  return getMetadata({
    title,
    description,
  });
}

export { MarketPage as default } from '@/src/page/market';
