import bcrypt from 'bcrypt';
import type { IHashPasswordService } from "../../application/interfaces/IHashPasswordService.js";
import getEnv from '../../shared/utils/getEnv.js';

class HashPasswordService implements IHashPasswordService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, parseInt(getEnv('BCRYPT_SALT'), 10));
  }

  async comparePassword(password: string, hashPassword: string): Promise<boolean> {
      return bcrypt.compare(password, hashPassword);
  }
}

export default HashPasswordService;
