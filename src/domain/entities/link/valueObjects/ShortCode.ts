import InvalidShortUrlError from "../errors/InvalidShortUrlError.js";

class ShortCode {
  readonly value: string;
  private static BASE62_REGEX = /^[a-zA-Z0-9]+$/;

  constructor({ value } : { value: string }) {
    if (!ShortCode.isValid(value)) throw new InvalidShortUrlError();

    this.value = value;
  }
 
  private static isValid(value: string) {
    return !!value && ShortCode.BASE62_REGEX.test(value);
  }
}

export default ShortCode;
