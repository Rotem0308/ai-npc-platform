import { Role } from '@prisma/client';

export class UserEntity {
  id?: number;
  name: string;
  email: string;
  avatarUrl: string | null;
  role: Role;
  passwordHash: string;
  refreshTokenHash: string | null;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
// name: string;
// id: number;
// email: string;
// passwordHash: string;
// refreshTokenHash: string | null;
// avatarUrl: string | null;
// role: $Enums.Role;
