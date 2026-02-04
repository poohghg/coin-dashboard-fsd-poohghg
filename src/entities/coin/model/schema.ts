import { z } from 'zod';

export const CoinMarketSchema = z.object({
  market: z.string(),
  korean_name: z.string(),
  english_name: z.string(),
  market_event: z.object({
    warning: z.boolean(),
    caution: z.object({
      PRICE_FLUCTUATIONS: z.boolean(),
      TRADING_VOLUME_SOARING: z.boolean(),
      DEPOSIT_AMOUNT_SOARING: z.boolean(),
      GLOBAL_PRICE_DIFFERENCES: z.boolean(),
      CONCENTRATION_OF_SMALL_ACCOUNTS: z.boolean(),
    }),
  }),
});
export const CoinMarketsSchema = z.array(CoinMarketSchema);
export type CoinMarketDTO = z.infer<typeof CoinMarketSchema>;

export const CoinTickerSchema = z.object({
  market: z.string(),

  trade_date: z.string(),
  trade_time: z.string(),
  trade_date_kst: z.string(),
  trade_time_kst: z.string(),
  trade_timestamp: z.number(),

  opening_price: z.number(),
  high_price: z.number(),
  low_price: z.number(),
  trade_price: z.number(),
  prev_closing_price: z.number(),

  change: z.enum(['EVEN', 'RISE', 'FALL']),
  change_price: z.number(),
  change_rate: z.number(),
  signed_change_price: z.number(),
  signed_change_rate: z.number(),

  trade_volume: z.number(),

  acc_trade_price: z.number(),
  acc_trade_price_24h: z.number(),
  acc_trade_volume: z.number(),
  acc_trade_volume_24h: z.number(),

  highest_52_week_price: z.number(),
  highest_52_week_date: z.string(),
  lowest_52_week_price: z.number(),
  lowest_52_week_date: z.string(),

  timestamp: z.number(),
});
export const CoinTickersSchema = z.array(CoinTickerSchema);
export type CoinTickerDTO = z.infer<typeof CoinTickerSchema>;

export const CoinDetailSocketSchema = z.object({
  type: z.literal('ticker'),
  code: z.string(),
  opening_price: z.number(),
  high_price: z.number(),
  low_price: z.number(),
  trade_price: z.number(),
  prev_closing_price: z.number(),
  change: z.enum(['RISE', 'EVEN', 'FALL']),
  change_price: z.number(),
  signed_change_price: z.number(),
  change_rate: z.number(),
  signed_change_rate: z.number(),
  trade_volume: z.number(),
  acc_trade_volume: z.number(),
  acc_trade_volume_24h: z.number(),
  acc_trade_price: z.number(),
  acc_trade_price_24h: z.number(),
  trade_date: z.string(),
  trade_time: z.string(),
  trade_timestamp: z.number(),
  ask_bid: z.enum(['ASK', 'BID']),
  acc_ask_volume: z.number(),
  acc_bid_volume: z.number(),
  highest_52_week_price: z.number(),
  highest_52_week_date: z.string(),
  lowest_52_week_price: z.number(),
  lowest_52_week_date: z.string(),
  market_state: z.enum(['PREVIEW', 'ACTIVE', 'DELISTED']),
  is_trading_suspended: z.boolean(),
  delisting_date: z.string().nullable(),
  market_warning: z.enum(['NONE', 'CAUTION']),
  timestamp: z.number(),
  stream_type: z.enum(['SNAPSHOT', 'REALTIME']),
});
export type CoinDetailSocketDTO = z.infer<typeof CoinDetailSocketSchema>;

export const CoinSocketSchema = CoinDetailSocketSchema.pick({
  type: true,
  code: true,
  trade_price: true,
  change: true,
  signed_change_price: true,
  signed_change_rate: true,
  acc_trade_price_24h: true,
  trade_volume: true,
  acc_trade_price: true,
  timestamp: true,
});
export type CoinSocketDTO = z.infer<typeof CoinSocketSchema>;
