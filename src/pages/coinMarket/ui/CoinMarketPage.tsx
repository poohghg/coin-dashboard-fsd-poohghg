const CoinMarketPage = async ({ params }: { params: Promise<{ market: string }> }) => {
  const { market } = await params;
  return <div>Coin Market Page {market}</div>;
};

export default CoinMarketPage;
