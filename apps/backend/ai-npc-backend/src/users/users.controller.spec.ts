import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersRepository } from './users.repository';
import { UserMapper } from './user.mapper';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;
  let usersRepository: UsersRepository;
  let userMapper: UserMapper;

  const mockUsersRepository = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const mockUserMapper = {
    toDomain: jest.fn(),
    fromRegisterDto: jest.fn(),
  };
  const mockJwtAuthGuard = {
    canActivate: jest.fn(() => true), // always allow
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: mockUsersRepository },
        { provide: UserMapper, useValue: mockUserMapper },
        // { provide: UsersService, useValue: mockUsersService },
      ],
    })
      // override the JwtAuthGuard with a mock
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    controller = module.get<UsersController>(UsersController);
    // usersService = module.get<UsersService>(UsersService);
    usersService = module.get(UsersService);
    // usersRepository = module.get<UsersRepository>(UsersRepository);
    // userMapper = module.get<UserMapper>(UserMapper);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return user profile for valid request', async () => {
    const mockUser = {
      id: 1,
      email: 'alice@example.com',
      name: 'Alice',
      role: 'USER',
      avatarUrl: 'https://example.com/avatars/alice.png',
      passwordHash: 'hashedpassword',
      refreshTokenHash: null,
    };

    // Make sure signAsync is mocked to resolve a string
    jest
      .spyOn(usersService, 'findOneByEmail')
      .mockResolvedValue(mockUser as any);

    // Simulate request object
    const req = { user: { email: 'alice@example.com' } };

    const result = await controller.getProfile(req);

    expect(usersService.findOneByEmail).toHaveBeenCalledWith(
      'alice@example.com',
    );
    expect(result).toEqual(mockUser);
  });
});
