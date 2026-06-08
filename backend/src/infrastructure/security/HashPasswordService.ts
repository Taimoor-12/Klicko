import bcrypt from 'bcrypt';
import type { IHashPasswordService } from "../../application/interfaces/IHashPasswordService.js";
import { config } from '../../config/index.js';

class HashPasswordService implements IHashPasswordService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, config.auth.bcryptSaltRounds);
  }

  async comparePassword(password: string, hashPassword: string): Promise<boolean> {
      return bcrypt.compare(password, hashPassword);
  }
}

export default HashPasswordService;
