import { PrismaAdapter } from 'next-auth-adapter-prisma';
import { Prisma } from '@prisma/client';
async function adapter() {
  return new PrismaAdapter({ prisma });
}

export default adapter;