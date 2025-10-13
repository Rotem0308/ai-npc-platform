import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwt-payload';
import { UserEntity } from 'src/users/entities/user';
import { PasswordService } from './services/password.service';
import { RegisterDTO } from './dtos/register.dto';
import e from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private passwordService: PasswordService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user: UserEntity | undefined =
      await this.usersService.findOneByEmail(email);
    if (!user) return null;

    const isMatched = await this.passwordService.compare(
      password,
      user?.passwordHash || '',
    );
    if (!isMatched) return null;

    return user;
  }

  async login(user: UserEntity) {
    const { email, id } = user;
    if (email === undefined || id === undefined)
      throw new Error('Invalid user data');

    const payload: AuthJwtPayload = {
      email: email,
      sub: id,
    };
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token, //  generate the JWT from a subset of the user object properties
    };
  }

  async register(userData: RegisterDTO): Promise<UserEntity> {
    const hashedPassword = await this.passwordService.hash(userData.password);

    const user = await this.usersService.create(userData, hashedPassword);

    return user;
  }
}
