import InvalidLongUrl from "../errors/InvalidLongUrlError.js";
import InvalidProtocolError from "../errors/InvalidProtocolError.js";

class LongUrl {
  readonly value: string;

  constructor({ value } : { value : string }) {
    if (!LongUrl.isValidUrl(value)) throw new InvalidLongUrl();

    const url = new URL(value);

    if (!LongUrl.isValidProtocol(url)) throw new InvalidProtocolError();

    this.value = url.toString();
  }

  private static isValidUrl(value: string) {
    return URL.canParse(value);
  }

  private static isValidProtocol(url: URL) {
    return url.protocol === 'http:' || url.protocol === 'https:';
  }
}

export default LongUrl;
