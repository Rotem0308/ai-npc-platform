import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginDTO } from '../dtos/login.dto';
import { UserEntity } from 'src/users/entities/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    const usernameField: keyof LoginDTO = 'email';
    const passwordField: keyof LoginDTO = 'password';
    super({
      usernameField,
      passwordField,
    }); // by default expect username and password fields
  }

  async validate(email: string, password: string): Promise<UserEntity> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
