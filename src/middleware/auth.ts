import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../lib/prisma";
import bcrypt from 'bcrypt';
// Login user
export const login = async (request: any, reply: FastifyReply) => {
  const { email, password } = request.body;
  // try {
  
  //   if (!user) {
  //     return reply.code(401).send({ error: 'Invalid credentials' });
  //   }

  //   // Verify password
  //   const isPasswordValid = await bcrypt.compare(password, user.password);
    
  //   if (!isPasswordValid) {
  //     return reply.code(401).send({ error: 'Invalid credentials' });
  //   }

  //   // Generate JWT token
  //   const token = await reply.jwtSign({ 
  //     id: user.id,
  //     email: user.email
  //   });

  //   return reply.code(200).send({ 
  //     user: {
  //       id: user.id,
  //       email: user.email,
  //       name: user.name
  //     }, 
  //     token 
  //   });
  // } catch (error) {
  //   request.log.error(error);
  //   return reply.code(500).send({ error: 'Internal Server Error' });
  // }
};