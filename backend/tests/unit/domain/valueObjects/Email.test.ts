import { describe, it, expect } from "vitest";
import Email from '../../../../src/domain/entities/user/valueObjects/Email.js';
import InvalidEmailError from "../../../../src/domain/entities/user/errors/InvalidEmailError.js";

describe('Email VO', () => {
  it('throws on invalid email', () => {
    expect(() => new Email('Invalid')).toThrow(InvalidEmailError);
  });

  it('lowercases valid email', () => {
    expect(new Email ('USER@ExaMple.CoM').getValue()).toBe('user@example.com');
  });

  it('accepts valid email', () => {
    expect(() => new Email('user@example.com')).not.toThrow();
  });

  it('throws on empty string', () => {
    expect(() => new Email('')).toThrow(InvalidEmailError);
  });

  it('throws on missing @', () => {
    expect(() => new Email('userexample.com')).toThrow(InvalidEmailError);
  });

  it('throws on missing domain', () => {
    expect(() => new Email('user@')).toThrow(InvalidEmailError);
  });

  it('throws on missing top-level domain (TLD)', () => {
    expect(() => new Email('user@example')).toThrow(InvalidEmailError);
  });

  it('throws on email with whitespace', () => {
    expect(() => new Email('user @example.com')).toThrow(InvalidEmailError);
  });
});
