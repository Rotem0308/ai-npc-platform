import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { UserMapper } from './user.mapper';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: UsersRepository;
  let userMapper: UserMapper;

  beforeEach(async () => {
    const mockUsersRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    const mockUserMapper = {
      toDomain: jest.fn(),
      fromRegisterDto: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: mockUsersRepository },
        { provide: UserMapper, useValue: mockUserMapper },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
    userMapper = module.get<UserMapper>(UserMapper);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneByEmail', () => {
    it('should return a mapped user when found', async () => {
      const mockUserModel = { id: 1, email: 'test@example.com' };
      const mockUserEntity = { id: 1, email: 'test@example.com' };

      jest
        .spyOn(usersRepository, 'findByEmail')
        .mockResolvedValue(mockUserModel as any);
      jest.spyOn(userMapper, 'toDomain').mockReturnValue(mockUserEntity as any);

      const result = await service.findOneByEmail('test@example.com');
      expect(result).toEqual(mockUserEntity);
      expect(usersRepository.findByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
      expect(userMapper.toDomain).toHaveBeenCalledWith(mockUserModel);
    });

    it('should return undefined when user not found', async () => {
      jest.spyOn(usersRepository, 'findByEmail').mockResolvedValue(null);

      const result = await service.findOneByEmail('notfound@example.com');
      expect(result).toBeUndefined();
      expect(usersRepository.findByEmail).toHaveBeenCalledWith(
        'notfound@example.com',
      );
    });
  });

  describe('create', () => {
    it('should create and return mapped user', async () => {
      const dto = {
        email: 'new@example.com',
        name: 'New User',
        password: 'pass',
      };
      const hashedPassword = 'hashedPass';
      const mockUserEntity = { email: 'new@example.com' };
      const mockUserModel = { email: 'new@example.com' };

      jest
        .spyOn(userMapper, 'fromRegisterDto')
        .mockReturnValue(mockUserEntity as any);
      jest
        .spyOn(usersRepository, 'create')
        .mockResolvedValue(mockUserModel as any);
      jest.spyOn(userMapper, 'toDomain').mockReturnValue(mockUserEntity as any);

      const result = await service.create(dto as any, hashedPassword);
      expect(result).toEqual(mockUserEntity);
      expect(userMapper.fromRegisterDto).toHaveBeenCalledWith(
        dto,
        hashedPassword,
      );
      expect(usersRepository.create).toHaveBeenCalledWith(mockUserEntity);
      expect(userMapper.toDomain).toHaveBeenCalledWith(mockUserModel);
    });
  });
});
