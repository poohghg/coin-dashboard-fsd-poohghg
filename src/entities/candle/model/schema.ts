import { z } from 'zod';

export const CandleSchema = z.object({
  market: z.string(),
  candle_date_time_utc: z.string(),
  candle_date_time_kst: z.string(),
  opening_price: z.number(),
  high_price: z.number(),
  low_price: z.number(),
  trade_price: z.number(),
  timestamp: z.number(),
  candle_acc_trade_price: z.number(),
  candle_acc_trade_volume: z.number(),
  first_day_of_period: z.string().optional(),
  unit: z.number().optional(),
  prev_closing_price: z.number().optional(),
  change_price: z.number().optional(),
  change_rate: z.number().optional(),
  converted_trade_price: z.number().optional(),
});
export const CandlesSchema = z.array(CandleSchema);
export type CandleDTO = z.infer<typeof CandleSchema>;
