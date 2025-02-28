import fjwt from '@fastify/jwt'
import Fastify, { FastifyReply, FastifyRequest } from "fastify";

const fastify = Fastify();
import fastifyJwt, { JWT } from '@fastify/jwt'
declare module 'fastify' {
    interface FastifyRequest {
        jwt: JWT
    }
    export interface FastifyInstance {
        authenticate: any
    }
}

fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'imvinojan02061999xxxx'
});

fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: 'Unauthorized', message: 'Invalid or expired token' });
    }
    }
);
export default fastify;