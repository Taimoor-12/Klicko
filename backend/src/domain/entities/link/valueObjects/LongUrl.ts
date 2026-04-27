import InvalidLongUrl from "../errors/InvalidLongUrlError.js";
import InvalidProtocolError from "../errors/InvalidProtocolError.js";

class LongUrl {
  readonly value: string;

  constructor({ value }: { value: string }) {
    const normalizedUrl = LongUrl.normalize(value);
    if (!LongUrl.isValidUrl(normalizedUrl)) throw new InvalidLongUrl();

    const url = LongUrl.parseUrl(normalizedUrl);

    if (!LongUrl.isValidProtocol(url)) throw new InvalidProtocolError();

    this.value = url.toString();
  }

  private static isValidUrl(value: string) {
    if (!URL.canParse(value)) return false;

    const url = LongUrl.parseUrl(value);
    const hostname = url.hostname;

    // must have at least one dot in hostname (e.g. google.com)
    // and TLD must be at least 2 characters
    const parts = hostname.split('.');
    if (parts.length < 2) return false;

    const tld = parts[parts.length - 1];
    if (!tld || tld.length < 2) return false;

    return true;
  }

  private static parseUrl(value: string) {
    return new URL(value);
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
