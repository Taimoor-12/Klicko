import { describe, it, expect } from 'vitest';
import LongUrl from '../../../../src/domain/entities/link/valueObjects/LongUrl.js';
import InvalidLongUrl from '../../../../src/domain/entities/link/errors/InvalidLongUrlError.js';
import InvalidProtocolError from '../../../../src/domain/entities/link/errors/InvalidProtocolError.js';

describe('LongUrl VO', () => {
  it('throws on url with no protocol mentioned', () => {
    expect(() => new LongUrl({ value: 'facebook.com' })).toThrow(InvalidLongUrl);
  });

  it('throws on invalid protocol (not http or https)', () => {
    expect(() => new LongUrl({ value: 'ftp://facebook.com' })).toThrow(InvalidProtocolError);
  });

  it('accepts http url', () => {
    expect(() => new LongUrl({ value: 'http://facebook.com' })).not.toThrow();
  })

  it('accepts https url', () => {
    expect(() => new LongUrl({ value: 'https://facebook.com' })).not.toThrow();
  })
});
