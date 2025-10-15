import { User } from '@prisma/client';
import { UserEntity } from './entities/user';
import { Injectable } from '@nestjs/common';
import { RegisterDTO } from 'src/auth/dtos/register.dto';

@Injectable()
export class UserMapper {
  toDomain(dbUser: User): UserEntity {
    if (!dbUser) throw new Error('No user data');
    return new UserEntity(dbUser);
  }
  fromRegisterDto(dto: RegisterDTO, hashedPassword: string): UserEntity {
    return new UserEntity({
      name: dto.name,
      email: dto.email,
      passwordHash: hashedPassword, // <-- AuthService must inject hashed password here
      role: dto.role,
    });
  }
  // TODO: toPersistence
}
