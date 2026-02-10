import { CoinDetail } from '@/src/entities/coin';
import { OrderBook } from '@/src/page/market/ui/Orderbook/OrderBook';
import { OrderBookList } from '@/src/page/market/ui/Orderbook/OrderBookList';
import { OrderbookPriceInfo } from '@/src/page/market/ui/Orderbook/OrderbookPriceInfo';
import { RecentTrades } from '@/src/page/market/ui/Orderbook/RecentTrades';
import { marketService } from '@/src/page/market/usecase/marketService';
import { ServerFetcher } from '@/src/shared/uiKit';

interface OrderBookPanelProps {
  coin: CoinDetail;
}

export const OrderBookPanel = ({ coin }: OrderBookPanelProps) => {
  return (
    <ServerFetcher fetcher={() => marketService.getMarketData(coin.market)}>
      {({ orderBook, recentTrades }) => (
        <OrderBook
          AskOrderBooks={
            <OrderBookList
              key={'ask-orderbook'}
              type="ASK"
              orderBook={orderBook}
              prevClose={coin.prev_closing_price}
              lastLiveTradePrice={recentTrades[0].price}
            />
          }
          BidOrderBooks={
            <OrderBookList
              key={'bid-orderbook'}
              type="BID"
              orderBook={orderBook}
              prevClose={coin.prev_closing_price}
              lastLiveTradePrice={recentTrades[0].price}
            />
          }
          PriceInfo={<OrderbookPriceInfo coin={coin} />}
          RecentTrades={<RecentTrades market={coin.market} tradeTicks={recentTrades} />}
        />
      )}
    </ServerFetcher>
  );
};
