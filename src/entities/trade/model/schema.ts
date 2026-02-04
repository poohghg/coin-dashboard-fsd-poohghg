import { z } from 'zod';

export const TradeTickSchema = z.object({
  market: z.string(),
  trade_date_utc: z.string(),
  trade_time_utc: z.string(),
  timestamp: z.number(),
  trade_price: z.number(),
  trade_volume: z.number(),
  prev_closing_price: z.number(),
  change_price: z.number(),
  ask_bid: z.union([z.literal('ASK'), z.literal('BID')]),
  sequential_id: z.number(),
});

export const TradeTickSocketSchema = z
  .object({
    type: z.literal('trade'),
    code: z.string(),
    trade_date: z.string(),
    trade_time: z.string(),
    timestamp: z.number(),
    trade_price: z.number(),
    trade_volume: z.number(),
    prev_closing_price: z.number(),
    change_price: z.number(),
    ask_bid: z.union([z.literal('ASK'), z.literal('BID')]),
    sequential_id: z.number(),
  })
  .transform(data => ({
    market: data.code,
    trade_date_utc: data.trade_date,
    trade_time_utc: data.trade_time,
    ...data,
  }));

export const TradeTicksSchema = z.array(TradeTickSchema);

export type UpbitTradeTickDTO = z.infer<typeof TradeTickSchema>;

export type UpbitTradeTickSocketDTO = z.infer<typeof TradeTickSocketSchema>;
