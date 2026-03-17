import jwt from 'jsonwebtoken';
import type { ITokenService, TokenPayload } from '../../application/interfaces/ITokenService';

class TokenService implements ITokenService {
  private readonly secretKey: string;
  
  constructor() {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) throw new Error('JWT_SECRET is not set in .env');
    this.secretKey = secretKey;
  }

  async sign(payload: TokenPayload): Promise<string> {
    return jwt.sign(payload, this.secretKey, { expiresIn: '1d'});
  }

  async verify(token: string): Promise<TokenPayload> {
    const decoded = jwt.verify(token, this.secretKey);

    if (typeof decoded === 'string') throw new Error('Invalid token payload');

    return decoded as TokenPayload;
  }  
}

export default TokenService;
