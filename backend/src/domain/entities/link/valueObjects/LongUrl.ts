import InvalidLongUrl from "../errors/InvalidLongUrlError.js";
import InvalidProtocolError from "../errors/InvalidProtocolError.js";

class LongUrl {
  readonly value: string;

  constructor({ value }: { value: string }) {
    const normalizedUrl = LongUrl.normalize(value);
    if (!LongUrl.isValidUrl(normalizedUrl)) throw new InvalidLongUrl();

    const url = new URL(normalizedUrl);

    if (!LongUrl.isValidProtocol(url)) throw new InvalidProtocolError();

    this.value = url.toString();
  }

  private static isValidUrl(value: string) {
    return URL.canParse(value);
  }

  private static isValidProtocol(url: URL) {
    return url.protocol === "http:" || url.protocol === "https:";
  }

  private static normalize(value: string): string {
    let url = value.trim();

    const hasProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(url);

    if (!hasProtocol) {
      url = `https://${url}`;
    }

    return url;
  }
}

export default LongUrl;
