import bcrypt from 'bcrypt';
import type { IHashPasswordService } from "../../application/interfaces/IHashPasswordService.js";

class HashPasswordService implements IHashPasswordService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = process.env.BCRYPT_SALT || 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePassword(password: string, hashPassword: string): Promise<boolean> {
      return bcrypt.compare(password, hashPassword);
  }
}

export default HashPasswordService;