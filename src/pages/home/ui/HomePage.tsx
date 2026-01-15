import { CoinRepositoryImpl } from '@/src/entities/coin';
import HomeTabs from '@/src/pages/home/ui/HomeTabs';

const CoinPage = async () => {
  const res = await new CoinRepositoryImpl().getCoinList();
  return (
    <div className={'w-full flex flex-col items-center px-4 py-2'}>
      <HomeTabs />
    </div>
  );
};

export default CoinPage;
