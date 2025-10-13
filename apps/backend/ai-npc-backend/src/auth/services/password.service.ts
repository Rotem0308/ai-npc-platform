import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  private readonly saltRounds: number;

  constructor() {
    // You could inject ConfigService if using @nestjs/config
    this.saltRounds = parseInt(process.env.PASSWORD_SALT_ROUNDS ?? '10', 10);
  }

  async hash(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, this.saltRounds);
    } catch (error) {
      throw new InternalServerErrorException('Failed to hash password');
    }
  }

  async compare(password: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      throw new InternalServerErrorException('Failed to compare passwords');
    }
  }

  // utility to detect which algorithm was used
  static isBcryptHash(hash: string) {
    return hash.startsWith('$2'); // bcrypt hashes start with $2a/$2b/$2y
  }
}
