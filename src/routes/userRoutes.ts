import { FastifyInstance } from "fastify";
import { getUsers, createUser } from "../controllers/userController";

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: any;
  }
}

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get("/users", getUsers);
  fastify.post("/users", { onRequest: [fastify.authenticate] }, createUser);
}
