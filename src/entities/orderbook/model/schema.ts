import { z } from 'zod';

export const OrderbookUnitSchema = z.object({
  ask_price: z.number(),
  bid_price: z.number(),
  ask_size: z.number(),
  bid_size: z.number(),
});
export const OrderbookSchema = z.object({
  market: z.string(),
  timestamp: z.number(),
  total_ask_size: z.number(),
  total_bid_size: z.number(),
  orderbook_units: z.array(OrderbookUnitSchema),
});
export const OrderbooksSchema = z.array(OrderbookSchema);
export const OrderbooksSocketSchema = z
  .object({
    type: z.literal('orderbook'),
    code: z.string(),
    timestamp: z.number(),
    total_ask_size: z.number(),
    total_bid_size: z.number(),
    orderbook_units: z.array(OrderbookUnitSchema),
  })
  .transform(data => ({
    market: data.code,
    ...data,
  }));

export type OrderbookDTO = z.infer<typeof OrderbookSchema>;
export type OrderbookSocketDTO = z.infer<typeof OrderbooksSocketSchema>;

export const OrderbookInstrumentSchema = z.object({
  market: z.string(),
  quote_currency: z.string(),
  tick_size: z.string(),
  supported_levels: z.array(z.string()),
});
export const OrderbookInstrumentsSchema = z.array(OrderbookInstrumentSchema);
export type OrderbookInstrumentDTO = z.infer<typeof OrderbookInstrumentSchema>;
