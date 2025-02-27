// src/index.ts
import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = Fastify({ logger: true });

// Add your routes here
app.get('/', async () => {
  return { hello: 'world' };
});

// Example Prisma route
// app.get('/users', async () => {
//   const users = await prisma.user.findMany();
//   return users;
// });

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen({ port: 3000 }, (err) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  });
}

// Export for Vercel serverless function
export default async (req:any, res:any) => {
  await app.ready();
  app.server.emit('request', req, res);
};