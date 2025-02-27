import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';

export default fp(async (fastify) => {
  fastify.register(jwt, {
    secret: process.env.JWT_SECRET || 'your-super-secret-key-change-in-production',
    sign: {
      expiresIn: '1d' // token expires in 1 day
    }
  });

  // Create a decorator to verify JWT token
  fastify.decorate('authenticate', async (request:any, reply:any) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: 'Unauthorized', message: 'Invalid or expired token' });
    }
  });
});
