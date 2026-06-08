import jwt from 'jsonwebtoken';
import type { ITokenService, TokenPayload } from '../../application/interfaces/ITokenService.js';
import { config } from '../../config/index.js';

class TokenService implements ITokenService {
  private readonly secretKey = config.auth.jwtSecret;

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
