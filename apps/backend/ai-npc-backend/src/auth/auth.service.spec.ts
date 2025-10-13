import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { PasswordService } from './services/password.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'generated/prisma';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let passwordService: PasswordService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: PasswordService,
          useValue: {
            compare: jest.fn(),
            hash: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('signed-jwt'),
          },
        },
      ],
    }).compile();

    authService = moduleRef.get(AuthService);
    usersService = moduleRef.get(UsersService);
    passwordService = moduleRef.get(PasswordService);
    jwtService = moduleRef.get(JwtService);
  });

  describe('validateUser', () => {
    it('should return a user if credentials are valid', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        passwordHash: 'hashed',
        role: Role.USER,
      };

      jest
        .spyOn(usersService, 'findOneByEmail')
        .mockResolvedValue(mockUser as any);

      jest.spyOn(passwordService, 'compare').mockResolvedValue(true);

      const result = await authService.validateUser(
        'test@example.com',
        'password',
      );
      expect(result).toEqual(mockUser);
    });

    it('should return null if credentials are invalid', async () => {
      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValue(undefined);

      const result = await authService.validateUser(
        'wrong@example.com',
        'pass',
      );
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access_token when user is valid', async () => {
      const user = { id: 1, email: 'a@a.com', role: Role.USER };

      // Make sure signAsync is mocked to resolve a string
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue('signed-jwt');

      const result = await authService.login(user as any);

      expect(jwtService.signAsync).toHaveBeenCalledWith(
        expect.objectContaining({ sub: user.id, email: user.email }),
      );
      expect(result.access_token).toBe('signed-jwt');
    });
  });
  describe('register', () => {
    it('should create and return a new user', async () => {
      const registerDto = {
        email: 'new@example.com',
        password: 'password',
        name: 'New User',
      };
      const hashedPassword = 'hashedpassword';
      const mockCreatedUser = {
        id: 2,
        ...registerDto,
        role: Role.USER,
        passwordHash: hashedPassword,
      };

      // Mock PasswordService.hash
      jest.spyOn(passwordService, 'hash').mockResolvedValue(hashedPassword);

      // Mock UsersService.create
      jest
        .spyOn(usersService, 'create')
        .mockResolvedValue(mockCreatedUser as any);

      const result = await authService.register(registerDto as any);

      expect(passwordService.hash).toHaveBeenCalledWith(registerDto.password);
      expect(usersService.create).toHaveBeenCalledWith(
        registerDto,
        hashedPassword,
      );
      expect(result).toEqual(mockCreatedUser);
    });
  });
});
