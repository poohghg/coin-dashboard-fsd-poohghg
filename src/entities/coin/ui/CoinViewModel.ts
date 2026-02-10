import { CoinChangeType } from '@/src/entities/coin/model/type';
import { Formatter } from '@/src/shared/lib/formatCurrency';

export class CoinViewModel {
  /**
   * @param price
   * @returns 가격을 한국 원화(KRW) 형식으로 포맷팅한 문자열 (예: "₩1,234")
   * @example formatPrice(1234) => "₩1,234"
   */
  private static krwFormatter = new Intl.NumberFormat('ko-KR', {
    currency: 'KRW',
    maximumSignificantDigits: 6,
  });

  static getChangeRate(price: number, closing_price: number) {
    if (closing_price === 0) {
      return 0;
    }
    return (price - closing_price) / closing_price;
  }

  static getChangeType(price: number, closing_price: number): CoinChangeType {
    if (price > closing_price) {
      return 'RISE';
    }
    if (price < closing_price) {
      return 'FALL';
    }
    return 'EVEN';
  }

  /**
   * @param volume
   * @returns 거래대금을 백만,천만,억 단위로 포맷팅한 문자열 (예: "1백만", "2천만", "3억")
   */
  static formatTradePrice(volume: number): string {
    if (100_000_000 <= volume) {
      const hundredMillionUnits = Formatter.asKRWNumeric(volume) / 100_000_000;
      return Formatter.asGeneralNumber(hundredMillionUnits) + '억';
    } else if (10_000_000 <= volume) {
      const tenMillionUnits = Formatter.asKRWNumeric(volume) / 10_000_000;
      return Formatter.asGeneralNumber(tenMillionUnits) + '천만';
    } else if (1_000_000 <= volume) {
      const millionUnits = Formatter.asKRWNumeric(volume) / 1_000_000;
      return Formatter.asGeneralNumber(millionUnits) + '백만';
    }
    return Formatter.asKRWFormat(volume);
  }

  static formatVolume(volume: number): string {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(volume);
  }

  /**
   * @param price
   * @returns 가격을 한국 원화(KRW) 형식으로 포맷팅한 문자열 (예: "1,234원")
   * @example formatPrice(1234) => "1,234원"
   * @example 0.001 => "0.001원"
   */
  static formatPrice(price: number): string {
    return CoinViewModel.krwFormatter.format(price) + '원';
  }

  static formatSignedPrice(signed_change_price: number): string {
    const sign = 0 <= signed_change_price ? '+' : '';
    return `${sign}${this.formatPrice(signed_change_price)}`;
  }

  /**
   * @param signed_change_rate 부호가 있는 변동률 (예: -0.0123)
   * @returns 변동률을 백분율 형식으로 포맷팅한 문자열 (예: "-1.23%")
   * @example formatChangeRate(-0.0123) => "-1.23%"
   */
  static formatChangeRate(signed_change_rate: number): string {
    const sign = 0 <= signed_change_rate ? '+' : '';
    const percentage = signed_change_rate * 100;
    return `${sign}${percentage.toFixed(2)}%`;
  }

  static changeColorClass(type: CoinChangeType): string {
    if (type === 'RISE') {
      return `text-red-500`;
    }
    if (type === 'FALL') {
      return `text-blue-500`;
    }
    return `text-gray-500`;
  }

  static changeAnimationClass(type: CoinChangeType): string {
    if (type === 'RISE') {
      return `animate-highlight-up`;
    }
    if (type === 'FALL') {
      return `animate-highlight-down`;
    }
    return ``;
  }
}
