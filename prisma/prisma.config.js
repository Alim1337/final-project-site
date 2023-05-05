const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      provider: 'postgresql',
      url: process.env.DATABASE_URL,
    },
  },
});

module.exports = prisma;

// Error handler
prisma.$on('error', (e) => {
  console.error('Prisma error:', e);
});
