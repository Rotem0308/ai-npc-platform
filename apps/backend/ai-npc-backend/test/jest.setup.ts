// Mock Prisma Client globally
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      $connect: jest.fn(),
      $disconnect: jest.fn(),
      // You can add other Prisma methods you use in services, e.g.,
      user: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
      },
    })),
  };
});
// Mock the generated Role enum globally
jest.mock('../generated/prisma', () => ({
  Role: {
    USER: 'USER',
    ADMIN: 'ADMIN',
  },
}));
