export class Formatter {
  /**
   * @param value 금액
   * @returns 포맷팅된 달러 문자열
   */
  public static asUSD(value: number): string {
    const formatted = this._formatNumber(value, 0, 4);
    return `$${formatted}`;
  }

  /**
   * @param value 금액
   * @returns 포맷팅된 원화 문자열
   */
  public static asKRW(value: number): string {
    // 원화는 소수점 없이 정수 형태로 표시 (minDecimals: 0, maxDecimals: 0)
    const formatted = this._formatNumber(value, 0, 0);
    return `${formatted}원`;
  }

  /**
   * @param value 숫자 (전체 일반 포멧 사용)
   * @returns 포맷팅된 일반 숫자 문자열
   */
  public static asGeneralNumber(value: number): string {
    return this._formatNumber(value, 0, 2);
  }

  /**
   * @param usdValue 달러 금액
   * @param exchangeRate 환율 (USD -> KRW)
   * @returns '≈ 1000원' 접두사가 붙은 원화 문자열
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
    const formattedKrw = this.asKRW(krwValue);
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
  public static asConvertedKRWNumeric(
    usdValue: number,
    exchangeRate: number,
  ): number {
    return Math.round(usdValue * exchangeRate);
  }

  /**
   * @param value 포맷팅할 숫자
   * @param minDecimals 최소 소수점 자릿수 (후행 0 유지를 제어)
   * @param maxDecimals 최대 소수점 자릿수 (반올림 및 표시 자릿수 상한)
   */
  static _formatNumber(
    value: number,
    minDecimals: number,
    maxDecimals: number,
  ): string {
    const multiplier = Math.pow(10, maxDecimals);
    const roundedValue = Math.round(value * multiplier) / multiplier;

    return roundedValue.toLocaleString("en-US", {
      minimumFractionDigits: minDecimals,
      maximumFractionDigits: maxDecimals,
    });
  }
}
