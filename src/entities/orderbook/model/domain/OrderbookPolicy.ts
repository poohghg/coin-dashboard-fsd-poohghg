interface PriceUnitRule {
  min: number;
  max?: number;
  unit: number;
}

const PRICE_UNIT_RULES: PriceUnitRule[] = [
  { min: 0, max: 1, unit: 0.0001 }, // 1원 미만: 0.0001원 단위 (ex: 0.1234)
  { min: 1, max: 10, unit: 0.01 }, // 1원 ~ 10원: 0.01원 단위
  { min: 10, max: 100, unit: 0.1 }, // 10원 ~ 100원: 0.1원 단위
  { min: 100, max: 5_000, unit: 1 }, // 100원 ~ 5,000원: 1원 단위
  { min: 5_000, max: 10_000, unit: 5 }, // 5,000원 ~ 10,000원: 5원 단위
  { min: 10_000, max: 50_000, unit: 10 }, // 10,000원 ~ 50,000원: 10원 단위
  { min: 50_000, max: 100_000, unit: 50 }, // 50,000원 ~ 100,000원: 50원 단위
  { min: 100_000, max: 500_000, unit: 100 }, // 100,000원 ~ 500,000원: 50원 단위
  { min: 500_000, max: 1_000_000, unit: 500 }, // 500,000원 ~ 1,000,000원: 100원 단위
  { min: 1_000_000, unit: 1000 }, // 1,000,000원 ~ 2,000,000원: 500원 단위
];

/**
 * 부동소수점 연산 오차 해결을 위한 Decimal 처리 함수
 * (JS는 0.1 + 0.2 === 0.30000000000000004 가 되는 문제가 있음)
 */
function add(a: number, b: number): number {
  return parseFloat((a + b).toFixed(8));
}

function sub(a: number, b: number): number {
  return parseFloat((a - b).toFixed(8));
}

export class OrderbookPolicy {
  normalizePrice(price: number): number {
    const unit = this.getPriceUnit(price);

    if (unit < 1) {
      // 소수점 단위인 경우 (ex: 0.0001)
      const factor = 1 / unit;
      return Math.floor(price * factor) / factor;
    } else {
      return Math.floor(price / unit) * unit;
    }
  }

  increase(currentPrice: number): number {
    const normalized = this.normalizePrice(currentPrice);
    const unit = this.getPriceUnit(normalized);
    const nextPrice = add(normalized, unit);

    return this.normalizePrice(nextPrice);
  }

  decrease(currentPrice: number): number {
    const normalized = this.normalizePrice(currentPrice);
    const unitForDec = this.getPriceUnit(sub(normalized, 0.00000001));
    const nextPrice = sub(normalized, unitForDec);

    return Math.max(0, this.normalizePrice(nextPrice));
  }

  getPriceUnit(price: number): number {
    if (price < 0) {
      return 0;
    }

    const rule = PRICE_UNIT_RULES.find(r => r.min <= price && (r.max === undefined || price < r.max));

    if (!rule) {
      return PRICE_UNIT_RULES[PRICE_UNIT_RULES.length - 1].unit;
    }

    return rule.unit;
  }
}
