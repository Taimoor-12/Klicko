import { describe, it, expect } from 'vitest';
import ShortCode from '../../../../src/domain/entities/link/valueObjects/ShortCode.js';
import InvalidShortUrlError from '../../../../src/domain/entities/link/errors/InvalidShortUrlError.js';
import ShortCodeDoesNotExistError from '../../../../src/domain/entities/link/errors/ShortCodeDoesNotExistError.js';

describe('ShortCode VO', () => {
  it('throws on empty short code', () => {
    expect(() => new ShortCode({ value: '' })).toThrow(InvalidShortUrlError);
  });

  it('throws on invalid short code', () => {
    expect(() => new ShortCode({ value: 'abc!@#' })).toThrow(InvalidShortUrlError);
  });

  it('correctly converts 0 to base 62', () => {
    expect(ShortCode.fromSequence(0).value).toBe('a');
  });

  it('correctly converts 1 to base 62', () => {
    expect(ShortCode.fromSequence(1).value).toBe('b');
  });

  it('correctly converts 61 to base 62', () => {
    expect(ShortCode.fromSequence(61).value).toBe('9');
  });

  it('correctly converts 45445 number to base 62', () => {
    expect(ShortCode.fromSequence(45445).value).toBe('lY9');
  });

  it('accepts a valid short code', () => {
    expect(() => new ShortCode({ value: 'lY9' })).not.toThrow();
  });
});
