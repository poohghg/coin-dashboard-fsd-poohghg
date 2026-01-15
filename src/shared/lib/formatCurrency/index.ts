export class Formatter {
  /**
   * @param value 금액
   * @returns 포맷팅된 달러 문자열
   * @example 1234.56 -> '$1,234.56'
   */
  public static asUSDFormat(value: number): string {
    const formatted = this.formatNumber(value, 0, 4);
    return `$${formatted}`;
  }

  /**
   * @param value 금액
   * @param suffix 접미사 (기본값: '원')
   * @returns 포맷팅된 원화 문자열
   * @example 12345678 -> '12,345,678원'
   */
  public static asKRWFormat(value: number, suffix: string = '원'): string {
    // 원화는 소수점 없이 정수 형태로 표시 (minDecimals: 0, maxDecimals: 0)
    const formatted = this.formatNumber(value, 0, 0);
    return `${formatted}${suffix}`;
  }

  /**
   * @param value 숫자 (전체 일반 포멧 사용)
   * @returns 포맷팅된 일반 숫자 문자열
   * @example 12345678 -> '12,345,678'
   */
  public static asGeneralNumber(value: number): string {
    return this.formatNumber(value, 0, 2);
  }

  /**
   * @param usdValue 달러 금액
   * @param exchangeRate 환율 (USD -> KRW)
   * @returns '≈ 1000원' 접두사가 붙은 환율이 적용된 원화 문자열
   * @example asConvertedKRW(10, 1300) -> '≈ 13,000원'
   */
  public static asConvertedKRW(usdValue: number, exchangeRate: number): string {
    const krwValue = usdValue * exchangeRate;
    return this.asConvertedKRWFormat(krwValue);
  }

  /**
   * @param krwValue 원화 금액
   * @returns '≈ 1000원' 접두사가 붙은 원화 문자열
   */
  public static asConvertedKRWFormat(krwValue: number): string {
    const formattedKrw = this.asKRWFormat(krwValue);
    return `≈ ${formattedKrw}`;
  }

  /**
   * @param value 금액
   * @returns 소수점 없이 반올림된 원화 금액 정수
   */
  public static asKRWNumeric(value: number): number {
    return Math.round(value);
  }

  /**
   * @param usdValue 달러 금액
   * @param exchangeRate 환율 (USD -> KRW)
   * @returns 환율이 적용되어 소수점 없이 반올림된 원화 금액 정수
   */
  public static asConvertedKRWNumeric(usdValue: number, exchangeRate: number): number {
    return Math.round(usdValue * exchangeRate);
  }

  /**
   * @param value 포맷팅할 숫자
   * @param minDecimals 최소 소수점 자릿수 (후행 0 유지를 제어)
   * @param maxDecimals 최대 소수점 자릿수 (반올림 및 표시 자릿수 상한)
   */
  public static formatNumber(value: number, minDecimals: number, maxDecimals: number): string {
    const multiplier = Math.pow(10, maxDecimals);
    const roundedValue = Math.round(value * multiplier) / multiplier;

    return roundedValue.toLocaleString('en-US', {
      minimumFractionDigits: minDecimals,
      maximumFractionDigits: maxDecimals,
    });
  }

  /**
   * @param value 금액 (예: 74950000000)
   * @returns 단위 축약된 USD 문자열 (예: "$74.95B")
   */
  public static asAbbreviatedUSD(value: number): string {
    const absValue = Math.abs(value);
    let formatted: string;
    let suffix = '';

    if (absValue >= 1_000_000_000_000) {
      formatted = (value / 1_000_000_000_000).toFixed(2);
      suffix = 'T';
    } else if (absValue >= 1_000_000_000) {
      formatted = (value / 1_000_000_000).toFixed(2);
      suffix = 'B';
    } else if (absValue >= 1_000_000) {
      formatted = (value / 1_000_000).toFixed(2);
      suffix = 'M';
    } else {
      formatted = value.toFixed(2);
    }

    return `$${Number(formatted).toLocaleString('en-US')}${suffix}`;
  }
}
