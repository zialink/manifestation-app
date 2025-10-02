// Utility test for prisma client import
import { prisma } from '../lib/prisma';

describe('Prisma Client', () => {
  it('should be defined', () => {
    expect(prisma).toBeDefined();
  });
});
