import { FastifyInstance } from "fastify";
import { LoginUser } from "../controllers/auth";
export async function LoginUserRoute(fastify: FastifyInstance) {
  fastify.post("/", LoginUser);
  // fastify.post("/users", { onRequest: [fastify.authenticate] }, createUser);
}