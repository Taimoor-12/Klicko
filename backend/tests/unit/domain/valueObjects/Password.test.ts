import { describe, it, expect } from "vitest";
import Password from '../../../../src/domain/entities/user/valueObjects/Password.js';
import InvalidPasswordError from '../../../../src/domain/entities/user/errors/InvalidPasswordError.js';

describe('Password VO', () => {
  it('accepts a correct password', () => {
    expect(() => new Password('Taimoor123')).not.toThrow();
  });

  it('throws on empty password', () => {
    expect(() => new Password('')).toThrow(InvalidPasswordError);
  });

  it('throws on password less than 8 characters', () => {
    expect(() => new Password('taiMoor')).toThrow(InvalidPasswordError);
  });

  it('throws on password not having at least one uppercase letter', () => {
    expect(() => new Password('taimoor123')).toThrow(InvalidPasswordError);
  });
});
