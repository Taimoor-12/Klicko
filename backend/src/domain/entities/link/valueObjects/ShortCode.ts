import InvalidShortUrlError from "../errors/InvalidShortUrlError.js";

class ShortCode {
  readonly value: string;
  private static BASE62_REGEX = /^[a-zA-Z0-9]+$/;

  constructor({ value } : { value: string }) {
    if (!ShortCode.isValid(value)) throw new InvalidShortUrlError();

    this.value = value;
  }

  static fromSequence(num: number): ShortCode {
    const value = ShortCode.toBase62(num);
    return new ShortCode({ value });
  }
 
  private static isValid(value: string) {
    return value.length > 0 && ShortCode.BASE62_REGEX.test(value);
  }

  private static toBase62(num: number): string {
    const base62 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    if (num === 0) return base62[0]!;

    let result = '';

    while (num > 0) {
      const remainder = num % 62;
      result = base62[remainder] + result;
      num = Math.floor(num / 62);
    }

    return result;
  }
}

export default ShortCode;
