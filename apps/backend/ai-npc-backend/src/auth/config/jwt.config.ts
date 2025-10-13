import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    secret: process.env.JWT_SECRET || 'defaultSecret',
    signOptions: {
      expiresIn: parseInt(process.env.JWT_SECRET_EXPIRES_IN ?? '3600', 10),
    },
  }),
);
