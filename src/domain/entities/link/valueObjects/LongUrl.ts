import InvalidLongUrl from "../errors/InvalidLongUrlError.js";
import InvalidProtocolError from "../errors/InvalidProtocolError.js";

class LongUrl {
  readonly value: string;

  constructor({ value } : { value : string }) {
    if (!LongUrl.isValidUrl(value)) throw new InvalidLongUrl();
    if (!LongUrl.isValidProtocol(value)) throw new InvalidProtocolError();

    this.value = new URL(value).toString();
  }

  private static isValidUrl(value: string) {
    return URL.canParse(value);
  }

  private static isValidProtocol(value: string) {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return false;
    }

    return true;
  }
}

export default LongUrl;
