export const longUrl = {
  normalize: (value: string) => {
    let url = value.trim();

    const hasProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(url);

    if (!hasProtocol) {
      url = `https://${url}`;
    }

    return url;
  },

  isValidUrl: (value: string) => {
    if (!URL.canParse(value)) return false;

    const url = longUrl.parseUrl(value);
    const hostname = url.hostname;

    // must have at least one dot in hostname (e.g. google.com)
    // and TLD must be at least 2 characters
    const parts = hostname.split(".");
    if (parts[0] === 'www' && parts.length < 3) return false;
    if (parts.length < 2) return false;

    const tld = parts[parts.length - 1];
    if (!tld || tld.length < 2) return false;

    return true;
  },

  parseUrl: (value: string) => {
    return new URL(value);
  },

  isValidProtocol: (url: URL) => {
    return url.protocol === "http:" || url.protocol === "https:";
  },
};
