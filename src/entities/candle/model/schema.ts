import { z } from 'zod';

const candleBaseSchema = {
  market: z.string(),
  candle_date_time_utc: z.string(),
  candle_date_time_kst: z.string(),
  opening_price: z.number(),
  high_price: z.number(),
  low_price: z.number(),
  trade_price: z.number(),
  candle_acc_trade_price: z.number(),
  candle_acc_trade_volume: z.number(),
  timestamp: z.number(),
};

export const CandleSchema = z.object({
  ...candleBaseSchema,
  first_day_of_period: z.string().optional(),
  unit: z.number().optional(),
  prev_closing_price: z.number().optional(),
  change_price: z.number().optional(),
  change_rate: z.number().optional(),
  converted_trade_price: z.number().optional(),
});

export const CandlesSchema = z.array(CandleSchema);
export type CandleDTO = z.infer<typeof CandleSchema>;

export const CandleSocketSchema = z
  .object({
    ...candleBaseSchema,
    type: z.enum(['candle.1m', 'candle.15m', 'candle.60m', 'candle.240m']),
    code: z.string(),
  })
  .omit({
    market: true,
  });

export type CandleSocketDTO = z.infer<typeof CandleSocketSchema>;
