import jwt from 'jsonwebtoken';
import type { ITokenService, TokenPayload } from '../../application/interfaces/ITokenService';

class TokenService implements ITokenService {
  async sign(payload: TokenPayload): Promise<string> {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) throw new Error('JWT_SECRET is not set in .env');

    return jwt.sign(payload, secretKey, { expiresIn: '1d'});
  }

  async verify(token: string): Promise<TokenPayload> {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) throw new Error('JWT_SECRET is not set in .env');

    const decoded = jwt.verify(token, secretKey);

    if (typeof decoded === 'string') throw new Error('Invalid token payload');

    return decoded as TokenPayload;
  }  
}

export default TokenService;
